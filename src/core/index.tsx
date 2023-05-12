import { IUserSettings } from './interfaces';
import { Provider } from 'react-redux';
import { store } from './data/store';
import { Wrapper } from './ui/Wrapper';

export const RoundSlider = (props: IUserSettings) => {

    return (
        <Provider store={ store }>
            <Wrapper {...props} />
        </Provider>
    )
};