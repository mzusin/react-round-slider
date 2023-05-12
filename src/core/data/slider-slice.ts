import { createSlice } from '@reduxjs/toolkit';
// import type { RootState } from './store';

// Define a type for the slice state
export interface ISliderState {
    value: number;
}

// Define the initial state using that type
const initialState: ISliderState = {
    value: 0,
};

export const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        increment: (state: ISliderState) => {
            state.value += 1;
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
