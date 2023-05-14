import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { RoundSlider } from '../core';

const App = () => {
    return (
        <>
            <RoundSlider
                min={ 0 }
                max={ 100 }

                rx={ 250 }
                ry={ 150 }

                startAngleDegrees={ 0 }
                endAngleDegrees={ 360 }

                strokeWidth={ 15 }
                bgColor="#285f68"

                pointers={[
                    {
                        rx: 25,
                        ry: 25,
                        value: 0,
                    },

                    {
                        rx: 25,
                        ry: 25,
                        value: 50,
                    }
                ]}
            />
        </>
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

