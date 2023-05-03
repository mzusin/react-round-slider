import {  useRef, useState } from 'react';
import { formatSettings } from '../domain/settings-provider';
import { getSVGSize } from '../domain/svg-provider';
import { Slider } from './Slider';

export interface IRoundSlider {
    rx?: number;
    ry?: number;
    rxPointer?: number;
    ryPointer?: number;
    strokeWidth?: number;
    bgColor?: string;
    startAngleDegrees?: number;
    endAngleDegrees?: number;
}

export const RoundSlider = (props: IRoundSlider) => {

    const svgRef = useRef<SVGSVGElement>(null);

    const [settings] = useState(formatSettings(props));

    const { svgWidth, svgHeight } = getSVGSize(settings);

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