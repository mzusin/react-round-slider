import { IUserSettings } from './interfaces';
import { Provider } from 'react-redux';
import { RoundSliderContext, store } from './data/store';
import { Wrapper } from './ui/Wrapper';

export const RoundSlider = (props: IUserSettings) => {

    return (
        <Provider store={ store } context={ RoundSliderContext }>
            <Wrapper {...props} />
        </Provider>
    )
};