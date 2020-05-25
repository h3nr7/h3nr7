import * as React from 'react';
import { Transition } from 'react-transition-group';

import { INaviProps } from './navi.interface';
import { NaviContainer, NavLinkWrapper, NavLink, LinkContainer } from './navi.styles';
import { useArticleTypes } from '../../helper/apiHooks';
import { useMediaDetect } from  '../../helper/mediaQueryHook';
import { Typography } from '@material-ui/core';

export const Navi:React.FC<{}> = () => {
    const mediaType = useMediaDetect();

    const [naviActive, setNaviActive] = React.useState(false);
    const [ hasMouse, setHasMouse ] = React.useState(false);
    const [ hasTouch, setHasTouch ] = React.useState(false);

    /** set and reload if it has mouse */
    React.useEffect(() => {
        setHasMouse(mediaType.hasMouse);
        setHasTouch(mediaType.hasTouch);
    }, [mediaType]);


    const articleTypes = useArticleTypes();
    const naviArr = [
        ...articleTypes.items.map(({id, ...obj}:any):Array<INaviProps> => ({
            id,
            to: `/?filter=${id}`,
            ...obj
        })),
        // disable
        // { title: 'archive', id:'navilink_archive', to: '/archive'},
        // { title: 'about', id:'navilink_about', to: '/about'}
    ];
    const mouseOverHandler = React.useCallback(() => {
        if(hasMouse) setNaviActive(true);

    }, [hasTouch, hasMouse]);

    const mouseOutHandler = React.useCallback(() => {
        if(hasMouse) setNaviActive(false);
    }, [hasTouch, hasMouse]);

    return (
        <NaviContainer onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler}>
            <Typography variant='h5'>
                <NavLink to='/'>h3nr7</NavLink> 
            </Typography>
            {hasMouse ? (
                <Transition in={naviActive} timeout={500}>
                    {(state) => (
                        <LinkContainer>
                            <Typography variant='h5'>
                            { naviArr.map(({ id, title, to }:INaviProps, count:number) => (
                                <NavLinkWrapper count={count} key={id} state={state}>
                                    <NavLink to={to}>{title}</NavLink>
                                </NavLinkWrapper>
                            ))}
                            </Typography>
                        </LinkContainer>
                    )}
                </Transition>
            ) : null }
        </NaviContainer>
    )

}