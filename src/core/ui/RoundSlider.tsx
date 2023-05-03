import { SVG } from './SVG';
import { formatSettings, SettingsContext } from '../domain/settings-provider';

export interface IRoundSlider {
    rx?: number;
    ry?: number;
    rxPointer?: number;
    ryPointer?: number;
    strokeWidth?: number;
    bgColor?: string;
    startAngleDegrees?: number;
    endAngleDegrees?: number;
}

export const RoundSlider = (props: IRoundSlider) => {

    return (
        <SettingsContext.Provider value={ formatSettings(props) }>
           <SVG />
        </SettingsContext.Provider>
    )
};