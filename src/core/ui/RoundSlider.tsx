import { IUserSettings } from '../interfaces';
import { store } from '../data/store';
import { Provider } from 'react-redux';
import { SVG } from './SVG';

export const RoundSlider = (props: IUserSettings) => {

    return (
        <Provider store={ store }>
           <SVG {...props} />
        </Provider>
    )
};