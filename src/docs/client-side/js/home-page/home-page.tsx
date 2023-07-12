import hljs from 'highlight.js';
import ReactDOM from 'react-dom/client';
import * as React from 'react';
import { RoundSlider } from '../../../../core';
import { useState } from 'react';

const initSlider1 = () => {
    const $colorSlider = document.getElementById('color-slider') as HTMLElement;
    if(!$colorSlider) return;

    const Component = () => {

        const [ value, setValue ] = useState(0);

        const onChange = (values: (string|number)[]) => {
            if(!onChange || onChange.length <= 0) return;
            const val = Number(values[0]) || 0;
            setValue(val);
        };

        return (
              <RoundSlider
                  min={ 0 }
                  max={ 360 }
                  pathInnerBgColor={ `hsl(${ value }, 100%, 50%)` }
                  onChange={ onChange }
              />
        );
    };

    const colorSlider = ReactDOM.createRoot($colorSlider);
    colorSlider.render(
        <React.StrictMode>
            <Component />
        </React.StrictMode>
    );
};

export const initHomePage = () => {
    if(hljs){
        hljs.highlightAll();
    }

    initSlider1();
};