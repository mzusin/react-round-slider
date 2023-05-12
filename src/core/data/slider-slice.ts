import { createSlice } from '@reduxjs/toolkit';
import { IState } from '../interfaces';
import {
    DEFAULT_BG_COLOR, DEFAULT_END_ANGLE,
    DEFAULT_POINTER_RX, DEFAULT_POINTER_RY,
    DEFAULT_START_ANGLE, DEFAULT_STROKE_WIDTH,
    DEFAULT_SVG_RX, DEFAULT_SVG_RY
} from '../domain/defaults';
import { getEllipseSegment, getSVGCenter, getSVGSize } from '../domain/svg-provider';
import { Vector2 } from 'mz-math';
// import type { RootState } from './store';

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

const initialState: IState = {
    // Main SVG ellipse/circle rx/ry.
    svgRadii: defaultSvgRadii,

    // Start and end angle of the SVG ellipse/circle.
    angles: [DEFAULT_START_ANGLE, DEFAULT_END_ANGLE],

    strokeWidth: DEFAULT_STROKE_WIDTH,
    bgColor: DEFAULT_BG_COLOR,

    pointers: [{
        pointerRadii: defaultMaxPointerRadii,
    }],

    // calculated properties ----------------------------
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
        increment: (_state: IState) => {
            // state.value += 1;
        },
        /*decrement: state => {
            state.value -= 1;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        main(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },*/
    }
});

export const { increment } = sliderSlice.actions;
// export const { increment, decrement, incrementByAmount } = sliderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectValue = (state: RootState) => state.slider.value;

export default sliderSlice.reducer;
