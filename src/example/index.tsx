import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { RoundSlider } from '../core/ui/RoundSlider';

const App = () => {
    return (
        <RoundSlider
            width={ 300 }
            height={ 200 }
            startAngle={ 0 }
            endAngle={ 360 }
        />
    );
};

const init = () => {
    const $root =  document.getElementById('root') as HTMLElement;
    if(!$root) return;

    const root = ReactDOM.createRoot($root);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
};

init();

