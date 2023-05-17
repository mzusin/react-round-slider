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
                connectionBgColor="#86e02c"

                pointers={[
                    {
                        rx: 25,
                        ry: 25,
                        value: 10,
                    },

                    {
                        rx: 15,
                        ry: 15,
                        value: 50,
                    },

                    {
                        rx: 20,
                        ry: 20,
                        value: 25,
                    },

                    /*{
                        rx: 0,
                        ry: 2,
                        value: 25,
                    }*/
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

