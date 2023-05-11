import { Slider } from './Slider';
import { formatSettings, SettingsContext } from '../domain/settings-provider';
import { IRoundSlider } from '../interfaces';

export type TStep = ((value: number | string, percent: number) => number) | number | undefined | null;
export type TData = (string | number)[] | undefined;

export const RoundSlider = (props: IRoundSlider) => {

    return (
        <SettingsContext.Provider value={ formatSettings(props) }>
           <Slider />
        </SettingsContext.Provider>
    )
};