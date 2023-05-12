import { configureStore } from '@reduxjs/toolkit';
import { sliderSlice } from './slider-slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        slider: sliderSlice.reducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself.
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`.
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;