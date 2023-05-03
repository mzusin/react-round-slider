import { IRoundSlider } from '../ui/RoundSlider';
import { isNumber, Vector2 } from 'mz-math';

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
}

export const getNumber = (value: number|undefined|null, defaultValue: number) : number => {
    return isNumber(value) ? Number(value) : defaultValue;
};

export const getString = (value: string|undefined|null, defaultValue: string) : string => {
    return value === undefined || value === null ? defaultValue : value;
};

export const formatSettings = (props: IRoundSlider) : ISettings => {

    const strokeWidth = getNumber(props.strokeWidth, DEFAULT_STROKE_WIDTH);
    const svgRadii: Vector2 = [getNumber(props.rx, DEFAULT_SVG_RX), getNumber(props.ry, DEFAULT_SVG_RY)];
    const pointerRadii: Vector2 = [getNumber(props.rxPointer, DEFAULT_POINTER_RX), getNumber(props.ryPointer, DEFAULT_POINTER_RY)];
    const startAngleDegrees = getNumber(props.startAngleDegrees, DEFAULT_START_ANGLE);
    const endAngleDegrees = getNumber(props.endAngleDegrees, DEFAULT_END_ANGLE);
    const bgColor = getString(props.bgColor, DEFAULT_BG_COLOR);

    return {
        svgRadii,
        pointerRadii,

        startAngleDegrees,
        endAngleDegrees,

        strokeWidth,
        bgColor,
    };
};