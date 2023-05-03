import { useContext, useEffect, useRef } from 'react';
import { Slider } from './Slider';
import { SettingsContext } from '../domain/settings-provider';
import { Pointer } from './Pointer';

export const SVG = () => {

    const svgRef = useRef<SVGSVGElement>(null);

    const settings = useContext(SettingsContext);

    const { svgWidth, svgHeight } = settings;

    useEffect(() => {
        if(!svgRef || !svgRef.current) return;

    }, []);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            ref={ svgRef }
            width={ svgWidth }
            height={ svgHeight }>

            <Slider />
            <Pointer center={ settings.sliderStartPoint } />
        </svg>
    )
};