import * as React from 'react';
import { Transition } from 'react-transition-group';
import { INaviProps } from './navi.interface';
import { NaviContainer, NavLinkWrapper, NavLink, LinkContainer } from './navi.styles';
import { useArticleTypes } from '../../helper';
import { ITopic } from '../../../shared/interfaces/topics.interface';
import { Typography } from '@material-ui/core';

export const Navi:React.FC<{}> = () => {
    const [naviActive, setNaviActive] = React.useState(false);
    
    const articleTypes = useArticleTypes();
    const naviArr = [
        ...articleTypes.items.map(({id, ...obj}:any):Array<INaviProps> => ({
            to: `/?filter=${id}`,
            ...obj
        })),
        { title: 'archive', id: 'navilink_archive', to: '/archive'},
        { title: 'about', id: 'navilink_about', to: '/about'}
    ];
    const mouseOverHandler = React.useCallback(() => {
        setNaviActive(true);

    }, []);

    const mouseOutHandler = React.useCallback(() => {
        setNaviActive(false);

    }, []);

    return (
        <NaviContainer onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler}>
            <Typography variant='h5'>
                <NavLink to='/'>h3nr7</NavLink> 
            </Typography>
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
                        {/* <Typography variant='h5'>
                            / <NavLink to='/?filter=project'>Projects</NavLink>
                            / <NavLink to='/?filter=project'>Post</NavLink>
                            / <NavLink to='/info'>Info</NavLink>
                            / <NavLink to='/archive'>Archive</NavLink>
                        </Typography> */}
                    </LinkContainer>
                )}
            </Transition>
        </NaviContainer>
    )

}