import { IRoundSlider } from '../ui/RoundSlider';
import { isNumber, Vector2 } from 'mz-math';
import { createContext } from 'react';
import { getSVGSize } from './svg-provider';

// ----------------  DEFAULTS -------------------
const DEFAULT_STROKE_WIDTH = 5;
const DEFAULT_SVG_RX = 200;
const DEFAULT_SVG_RY = 200;
const DEFAULT_POINTER_RX = 10;
const DEFAULT_POINTER_RY = 10;
const DEFAULT_BG_COLOR = '#efefef';
const DEFAULT_START_ANGLE = 0;
const DEFAULT_END_ANGLE = 180;

export interface ISettings {
    svgRadii: Vector2;
    pointerRadii: Vector2;

    startAngleDegrees: number;
    endAngleDegrees: number;

    strokeWidth: number;
    bgColor: string;

    svgWidth: number;
    svgHeight: number;
}

// ---------------- HELPERS -------------------------
export const getNumber = (value: number|undefined|null, defaultValue: number) : number => {
    return isNumber(value) ? Number(value) : defaultValue;
};

export const getString = (value: string|undefined|null, defaultValue: string) : string => {
    return value === undefined || value === null ? defaultValue : value;
};

// ---------------- SETTINGS -------------------------
export const formatSettings = (props: IRoundSlider) : ISettings => {

    const svgRadii: Vector2 = [getNumber(props.rx, DEFAULT_SVG_RX), getNumber(props.ry, DEFAULT_SVG_RY)];
    const pointerRadii: Vector2 = [getNumber(props.rxPointer, DEFAULT_POINTER_RX), getNumber(props.ryPointer, DEFAULT_POINTER_RY)];

    const startAngleDegrees = getNumber(props.startAngleDegrees, DEFAULT_START_ANGLE);
    const endAngleDegrees = getNumber(props.endAngleDegrees, DEFAULT_END_ANGLE);

    const strokeWidth = getNumber(props.strokeWidth, DEFAULT_STROKE_WIDTH);
    const bgColor = getString(props.bgColor, DEFAULT_BG_COLOR);

    const { svgWidth, svgHeight } = getSVGSize(svgRadii, pointerRadii, strokeWidth);

    return {
        svgRadii,
        pointerRadii,

        startAngleDegrees,
        endAngleDegrees,

        strokeWidth,
        bgColor,

        svgWidth,
        svgHeight,
    };
};

export const SettingsContext = createContext<ISettings>({
    svgRadii: [DEFAULT_SVG_RX, DEFAULT_SVG_RY],
    pointerRadii: [DEFAULT_POINTER_RX, DEFAULT_POINTER_RY],

    startAngleDegrees: DEFAULT_START_ANGLE,
    endAngleDegrees: DEFAULT_END_ANGLE,

    strokeWidth: DEFAULT_STROKE_WIDTH,
    bgColor: DEFAULT_BG_COLOR,

    ...getSVGSize([DEFAULT_SVG_RX, DEFAULT_SVG_RY], [DEFAULT_POINTER_RX, DEFAULT_POINTER_RY], DEFAULT_STROKE_WIDTH),
});