import {
    DEFAULT_BG_COLOR, DEFAULT_END_ANGLE,
    DEFAULT_POINTER_RX, DEFAULT_POINTER_RY,
    DEFAULT_START_ANGLE, DEFAULT_STROKE_WIDTH,
    DEFAULT_SVG_RX, DEFAULT_SVG_RY,
    MIN_VALUE_DEFAULT, MAX_VALUE_DEFAULT,
} from '../domain/defaults';
import { createSlice } from '@reduxjs/toolkit';
import { IState } from '../interfaces';
import { getEllipseSegment, getSVGCenter, getSVGSize } from '../domain/slider-provider';
import { Vector2 } from 'mz-math';

const defaultSvgRadii: Vector2 = [DEFAULT_SVG_RX, DEFAULT_SVG_RY];
const defaultMaxPointerRadii: Vector2 = [DEFAULT_POINTER_RX, DEFAULT_POINTER_RY];

const svgSize = getSVGSize(
    defaultSvgRadii,
    defaultMaxPointerRadii,
    DEFAULT_STROKE_WIDTH
);

const svgCenter = getSVGCenter(
    defaultSvgRadii,
    defaultMaxPointerRadii,
    DEFAULT_STROKE_WIDTH
);

const {
    sliderStartPoint,
    sliderEndPoint,
    largeArcFlag,
} = getEllipseSegment(
    DEFAULT_START_ANGLE,
    DEFAULT_END_ANGLE,
    defaultSvgRadii,
    defaultMaxPointerRadii,
    DEFAULT_STROKE_WIDTH
);

const pointers =  [{
    pointerRadii: defaultMaxPointerRadii,
    percent: 0,
}];

const pointerPositions = [sliderStartPoint];

const initialState: IState = {
    // Main SVG ellipse/circle rx/ry.
    svgRadii: defaultSvgRadii,

    // Start and end angle of the SVG ellipse/circle.
    angles: [DEFAULT_START_ANGLE, DEFAULT_END_ANGLE],

    strokeWidth: DEFAULT_STROKE_WIDTH,
    bgColor: DEFAULT_BG_COLOR,

    // Data -----------------------------
    min: MIN_VALUE_DEFAULT,
    max: MAX_VALUE_DEFAULT,
    step: undefined, // step is defined in absolute units (not percent!)

    // Pointers -------------------------
    pointers,
    pointerPositions,

    // calculated properties ------------
    svgSize,
    svgCenter,
    sliderStartPoint,
    sliderEndPoint,
    largeArcFlag,
};

export const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        initUserSettings(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
        updatePointersPosition(state, action) {
            return {
                ...state,
                pointerPositions: action.payload,
            };
        },
    }
});

export const sliderActions = sliderSlice.actions;
export default sliderSlice.reducer;
