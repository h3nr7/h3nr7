import { useEffect, useState } from 'react';
import detectIt from 'detect-it';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

type MediaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface IResizeState {
    mediaSizeType: MediaSize
    hasMouse: boolean
    hasTouch: boolean
}

function checkMediaSize(breakpoints:any, width:number) {
    if(breakpoints.xs < width && width <= breakpoints.sm) return 'sm';
    if(breakpoints.sm < width && width <= breakpoints.md) return 'md';
    if(breakpoints.md < width && width <= breakpoints.lg) return 'lg';
    if(breakpoints.lg < width && width <= breakpoints.xl) return 'xl';
}

/** detect media and touch */
export function useMediaDetect():IResizeState {
    const breakpoints = useTheme().breakpoints.values;

    const [mediaSizeType, setMediaSizeType] = useState<MediaSize>(checkMediaSize(breakpoints, window.innerWidth));
    const [hasMouse, setHasMouse] = useState(detectIt.hasMouse);
    const [hasTouch, setHasTouch] = useState(detectIt.hasTouch);


    useEffect(() => {
        function resizeHandler() {
            detectIt.update();
            setHasMouse(detectIt.hasMouse);
            setHasTouch(detectIt.hasTouch);
            setMediaSizeType(checkMediaSize(breakpoints, window.innerWidth));
        }

        window.addEventListener('load', resizeHandler);
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('load', resizeHandler);
            window.removeEventListener('resize', resizeHandler);
        }
    });

    return { mediaSizeType, hasMouse, hasTouch };
}