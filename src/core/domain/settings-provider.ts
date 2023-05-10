import { IRoundSlider, IRoundSliderPointer } from '../ui/RoundSlider';
import { isNumber, Vector2 } from 'mz-math';
import { createContext } from 'react';
import { getSliderProps, getSVGCenter, getSVGSize } from './svg-provider';
import { normalizeAngles } from './math-provider';

// ----------------  DEFAULTS -------------------
export const DEFAULT_STROKE_WIDTH = 5;
export const DEFAULT_SVG_RX = 200;
export const DEFAULT_SVG_RY = 200;
export const DEFAULT_POINTER_RX = 10;
export const DEFAULT_POINTER_RY = 10;
export const DEFAULT_BG_COLOR = '#efefef';
export const DEFAULT_START_ANGLE = 0;
export const DEFAULT_END_ANGLE = 180;

export interface ISettingsPointer {

    // user provided properties (or defaults) ----------
    pointerRadii: Vector2;
}

export interface ISettings {

    // user provided properties (or defaults) ----------
    svgRadii: Vector2;
    startAngleDegrees: number;
    endAngleDegrees: number;

    strokeWidth: number;
    bgColor: string;

    pointers: ISettingsPointer[],

    // calculated properties ----------------------------
    svgWidth: number;
    svgHeight: number;
    svgCenter: Vector2;

    sliderStartPoint: Vector2;
    sliderEndPoint: Vector2;
    largeArcFlag: number;
}

// ---------------- HELPERS -------------------------
export const getNumber = (value: number|undefined|null, defaultValue: number) : number => {
    return isNumber(value) ? Number(value) : defaultValue;
};

export const getString = (value: string|undefined|null, defaultValue: string) : string => {
    return value === undefined || value === null ? defaultValue : value;
};

export const getInitialPointers = (propsPointers?: IRoundSliderPointer[]): ISettingsPointer[] => {

    if(!propsPointers || propsPointers.length <= 0){
        return [{
            pointerRadii: [DEFAULT_POINTER_RX, DEFAULT_POINTER_RY],
        }]
    }
    const pointers: ISettingsPointer[] = [];

    for(const propsPointer of propsPointers){

        const pointerRadii: Vector2 = [
            getNumber(propsPointer.rx, DEFAULT_POINTER_RX),
            getNumber(propsPointer.ry, DEFAULT_POINTER_RY),
        ];

        pointers.push({
            pointerRadii,
        });
    }

    return pointers;
};

const getMaxPointerRadii = (pointers: ISettingsPointer[]) : Vector2 => {
    let maxX = -Infinity;
    let maxY = -Infinity;

    for(const pointer of pointers){
        maxX = Math.max(maxX, pointer.pointerRadii[0]);
        maxY = Math.max(maxY, pointer.pointerRadii[1]);
    }

    return [
        maxX,
        maxY,
    ];
};

// ---------------- SETTINGS -------------------------
export const formatSettings = (props: IRoundSlider) : ISettings => {

    const pointers: ISettingsPointer[] = getInitialPointers(props.pointers);

    const svgRadii: Vector2 = [getNumber(props.rx, DEFAULT_SVG_RX), getNumber(props.ry, DEFAULT_SVG_RY)];
    const [startAngleDegrees, endAngleDegrees] = normalizeAngles(props.startAngleDegrees, props.endAngleDegrees);

    const strokeWidth = getNumber(props.strokeWidth, DEFAULT_STROKE_WIDTH);
    const bgColor = getString(props.bgColor, DEFAULT_BG_COLOR);

    const maxPointer = getMaxPointerRadii(pointers);

    const { svgWidth, svgHeight } = getSVGSize(svgRadii, maxPointer, strokeWidth);

    const { sliderStartPoint, sliderEndPoint, largeArcFlag } = getSliderProps(
        startAngleDegrees,
        endAngleDegrees,
        svgRadii,
        maxPointer,
        strokeWidth
    );

    const svgCenter = getSVGCenter(svgRadii, maxPointer, strokeWidth);

    return {
        pointers,
        svgRadii,

        startAngleDegrees,
        endAngleDegrees,

        strokeWidth,
        bgColor,

        svgWidth,
        svgHeight,
        svgCenter,

        sliderStartPoint,
        sliderEndPoint,
        largeArcFlag,
    };
};

export const SettingsContext = createContext<ISettings>({
    pointers: getInitialPointers(),
    svgRadii: [DEFAULT_SVG_RX, DEFAULT_SVG_RY],
    // pointerRadii: [DEFAULT_POINTER_RX, DEFAULT_POINTER_RY],

    startAngleDegrees: DEFAULT_START_ANGLE,
    endAngleDegrees: DEFAULT_END_ANGLE,

    strokeWidth: DEFAULT_STROKE_WIDTH,
    bgColor: DEFAULT_BG_COLOR,

    ...getSVGSize([DEFAULT_SVG_RX, DEFAULT_SVG_RY], [DEFAULT_POINTER_RX, DEFAULT_POINTER_RY], DEFAULT_STROKE_WIDTH),
    ...getSliderProps(
        DEFAULT_START_ANGLE, DEFAULT_END_ANGLE,
        [DEFAULT_SVG_RX, DEFAULT_SVG_RY], [DEFAULT_POINTER_RX, DEFAULT_POINTER_RY],
        DEFAULT_STROKE_WIDTH
    ),

    svgCenter: getSVGCenter([DEFAULT_SVG_RX, DEFAULT_SVG_RY], [DEFAULT_POINTER_RX, DEFAULT_POINTER_RY], DEFAULT_STROKE_WIDTH),
});