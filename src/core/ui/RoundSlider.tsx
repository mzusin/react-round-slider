import { Slider } from './Slider';
import { formatSettings, SettingsContext } from '../domain/settings-provider';

export type TStep = ((value: number | string, percent: number) => number) | number | undefined | null;
export type TData = (string | number)[] | undefined;

export interface IRoundSliderPointer {
    rx?: number;
    ry?: number;
    value?: number | string;
}

export interface IRoundSlider {
    rx?: number;
    ry?: number;

    min?: number | string;
    max?: number | string;
    step?: TStep;
    data?: TData;

    pointers?: IRoundSliderPointer[];

    strokeWidth?: number;
    bgColor?: string;

    startAngleDegrees?: number;
    endAngleDegrees?: number;
}

export const RoundSlider = (props: IRoundSlider) => {

    return (
        <SettingsContext.Provider value={ formatSettings(props) }>
           <Slider />
        </SettingsContext.Provider>
    )
};