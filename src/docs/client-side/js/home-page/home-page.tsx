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
                pathStartAngle={ 150 }
                pathEndAngle={ 30 }

                pathBgColor={ '#d0d0d0' }
                pathThickness={ 5 }
                pathInnerBgColor={ 'url(#gradient)' }
                connectionBgColor={ '#939191' }

                pointerBgColor={ '#fff' }
                pointerBgColorSelected={ '#eeeeee' }
                pointerRadius={ 20 }

                enableTicks={ true }
                ticksCount={ 36 }
                ticksGroupSize={ 3 }
                ticksDistanceToPanel={ 5 }
                tickValuesPrefix={ ' ' }
                tickValuesSuffix={ '°' }
                tickValuesDistance={ 20 }
                tickValuesColor={ '#e1e1e1' }

                textColor={ '#fff' }
                textFontSize={ 24 }
                textSuffix={ '°' }
                textPrefix={ ' '}

                min={ 0 }
                max={ 360 }
                onChange={ onChange }

                pointers={[
                    {
                        value,
                    }
                ]}

                SvgDefs={
                    <>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={ `hsl(${ value }, 100%, 40%)` } />
                            <stop offset="100%" stopColor={ `hsl(${ value }, 50%, 20%)` } />
                        </linearGradient>
                    </>
                }
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