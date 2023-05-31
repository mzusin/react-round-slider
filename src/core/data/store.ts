import { configureStore } from '@reduxjs/toolkit';
import { sliderSlice } from './slider-slice';
import { createDispatchHook, createSelectorHook, createStoreHook, TypedUseSelectorHook } from 'react-redux';
import { createContext } from 'react';

/**
 * This context is used to prevent collision with any Redux store another npm package might use.
 * https://react-redux.js.org/api/hooks#custom-context
 */
export const RoundSliderContext = createContext(null);

export const store = configureStore({
    reducer: {
        slider: sliderSlice.reducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself.
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useDispatch = createDispatchHook(RoundSliderContext);
export const useSelector = createSelectorHook(RoundSliderContext);

// Use throughout your app instead of plain `useDispatch` and `useSelector`.
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = createStoreHook(RoundSliderContext);