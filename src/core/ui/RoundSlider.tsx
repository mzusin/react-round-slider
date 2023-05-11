import { Slider } from './Slider';
import { formatSettings, SettingsContext } from '../domain/settings-provider';
import { IUserSettings } from '../interfaces';

export const RoundSlider = (props: IUserSettings) => {

    return (
        <SettingsContext.Provider value={ formatSettings(props) }>
           <Slider />
        </SettingsContext.Provider>
    )
};