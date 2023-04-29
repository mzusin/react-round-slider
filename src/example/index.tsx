import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { RoundSlider } from '../core/ui/RoundSlider';

const App = () => {
    return (
        <RoundSlider
            rx={ 150 }
            ry={ 100 }
            startAngle={ 90 }
            endAngle={ 270 }
            strokeWidth={ 15 }
            stroke="#285f68"
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

