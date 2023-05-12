import { Slider } from './Slider';
// import { formatSettings } from '../domain/settings-provider';
import { IUserSettings } from '../interfaces';
import { store } from '../data/store';
import { Provider } from 'react-redux';

export const RoundSlider = (_props: IUserSettings) => {

    /*
    <SettingsContext.Provider value={ formatSettings(props) }>
           <Slider />
        </SettingsContext.Provider>
     */
    return (
        <Provider store={ store }>
           <Slider />
        </Provider>
    )
};