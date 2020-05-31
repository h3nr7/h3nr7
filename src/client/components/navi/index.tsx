import * as React from 'react';
import { Transition } from 'react-transition-group';

import { INaviProps } from './navi.interface';
import { NaviContainer, NavLinkWrapper, NavLink, LinkContainer } from './navi.styles';
import { useArticleTypes } from '../../helper/apiHooks';
import { useMediaDetect } from  '../../helper/mediaQueryHook';
import { Typography } from '@material-ui/core';
import { match } from 'react-router-dom';

export const Navi:React.FC<{}> = () => {

    /**
     * disabled styling
     */
    const activeStyles:React.CSSProperties = {
        pointerEvents: 'none',
        opacity: 0.2,
        cursor: 'default'
    };

    /**
     * check if link should be disabled
     * @param id 
     */
    const onLinkIsMatch = (id:string=null):<Params>(match:match<Params>, location:any)=>boolean => (match, location) => {
        if(!match) return false;
        const { isExact } = match;
        const { search } = location || {};
        const useQuery = new URLSearchParams(search);
        const filter = useQuery.get('filter');
        const isMatch = id && useQuery.get('filter') === id || !id && isExact && filter === null;
        return isMatch;
    };

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
        ...articleTypes.items.map(({id, title, ...obj}:any):Array<INaviProps> => ({
            id,
            title,
            to: `/?filter=${id}`,
            ...obj
        })),
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
            {hasMouse && !hasTouch ? (
                <Transition in={naviActive} timeout={500}>
                    {(state) => (
                        <LinkContainer>
                            <Typography variant='h5'>
                            { naviArr.map(({ id, key, title, to }:INaviProps, count:number) => (
                                <NavLinkWrapper count={count} key={key || id} state={state}>
                                <NavLink 
                                        activeStyle={activeStyles}
                                        isActive={onLinkIsMatch(id)}
                                        to={to}>{title}</NavLink>
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