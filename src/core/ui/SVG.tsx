import { useContext, useEffect, useRef } from 'react';
import { getSVGSize } from '../domain/svg-provider';
import { Slider } from './Slider';
import { SettingsContext } from '../domain/settings-provider';

export const SVG = () => {

    const svgRef = useRef<SVGSVGElement>(null);

    const settings = useContext(SettingsContext);
    console.log(settings)
    const { svgWidth, svgHeight } = getSVGSize(settings);

    useEffect(() => {
        if(!svgRef || !svgRef.current) return;

    }, []);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            ref={ svgRef }
            width={ svgWidth }
            height={ svgHeight }>

            <Slider settings={ settings } />
        </svg>
    )
};