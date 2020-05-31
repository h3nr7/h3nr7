import * as React from 'react';
import { Transition } from 'react-transition-group';
import { IBurgerProps } from './burger.interface';
import { hot } from 'react-hot-loader';
import { 
    Container, Content, StripContainer, 
    BurLinkWrapper, BurLink,
    Strip, MenuContainer, BG } from './burger.styles';

import { useMediaDetect } from  '../../helper/mediaQueryHook';
import { useArticleTypes } from '../../helper/apiHooks';
import { Typography } from '@material-ui/core';
import { match } from 'react-router-dom';

const BurgerComp:React.FC<{}> = (props) => {

    /**
     * disabled styling
     */
    const activeStyles:React.CSSProperties = {
        pointerEvents: 'none',
        opacity: 0.2,
        cursor: 'default'
    };

    /**
     * article types hook
     */
    const articleTypes = useArticleTypes();
    const burArr = [
        ...articleTypes.items.map(({id, title, ...obj}:any):Array<IBurgerProps> => ({
            id, 
            title, 
            to:`/?filter=${id}`,
            ...obj
        }))
    ]
    
    /**
     * state hooks
     */
    const mediaType = useMediaDetect();
    const [isOpen, setIsOpen] = React.useState(false);
    const [hasMouse, setHasMouse] = React.useState(true);

    /**
     * check if there is a mouse and enable if not
     */
    React.useEffect(() => {
        setHasMouse(mediaType.hasMouse);
    }, [mediaType]);

    /**
     * on burger menu touch handler
     */
    const onMenuTouch = React.useCallback(() => {
        setIsOpen(true);
    }, []);


    /**
     * on BG touch handler
     */
    const onBGTouch = React.useCallback((event:any) => {
        event.stopPropagation();
        setIsOpen(false);
    }, []);

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

    return hasMouse ? null : (
        <Transition in={isOpen} timeout={500}>
            {(state) => (
                <Container>
                    <BG state={state} onClick={onBGTouch} />
                    <MenuContainer state={state} onTouchEnd={onMenuTouch} >
                        <StripContainer>
                            <Strip state={state}/><Strip state={state}/><Strip state={state}/>
                        </StripContainer>
                    </MenuContainer>
                    <Content state={state}>
                        <Typography variant='h3'>
                        <BurLinkWrapper state={state}>
                            <BurLink 
                            activeStyle={activeStyles}
                            isActive={onLinkIsMatch()} 
                            onClick={onBGTouch} 
                            to={'/'}>home</BurLink>
                        </BurLinkWrapper>
                        { burArr.map(({ id, key, title, to }:IBurgerProps, count:number) => (
                            <BurLinkWrapper key={key || id} state={state}>
                                <BurLink 
                                activeStyle={activeStyles}
                                isActive={onLinkIsMatch(id)}
                                onClick={onBGTouch} 
                                to={to}>{title}</BurLink>
                            </BurLinkWrapper>
                        ))}
                        </Typography>
                    </Content>
                </Container>
            )}
        </Transition>
    )
}

export const Burger = hot(module)(BurgerComp);