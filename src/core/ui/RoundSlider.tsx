import { Slider } from './Slider';
import { IUserSettings } from '../interfaces';
import { store } from '../data/store';
import { Provider } from 'react-redux';

export const RoundSlider = (_props: IUserSettings) => {
    return (
        <Provider store={ store }>
           <Slider />
        </Provider>
    )
};