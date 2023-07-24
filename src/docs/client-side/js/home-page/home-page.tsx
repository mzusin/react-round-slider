import hljs from 'highlight.js';
import ReactDOM from 'react-dom/client';
import * as React from 'react';
import { RoundSlider } from '../../../../core';
import { useState } from 'react';
import { ISettingsPointer } from '../../../../core/domain/settings-provider';

const initColorSlider = () => {
    const $slider = document.getElementById('color-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([{ value: 90 }]);

        return (
            <RoundSlider
                pointers={ pointers }
                onChange={ setPointers }

                animateOnClick={ true }
                pathStartAngle={ 150 }
                pathEndAngle={ 30 }

                pathBgColor={ '#b4b4b4' }
                pathThickness={ 5 }
                pathInnerBgColor={ 'url(#color-slider-gradient)' }
                pathInnerBgFull={ true }
                connectionBgColor={ '#fff' }

                pointerBgColor={ '#fff' }
                pointerBgColorSelected={ '#dcdcdc' }
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

                SvgDefs={
                    <>
                        <linearGradient id="color-slider-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={ `hsl(${ pointers[0].value }, 100%, 40%)` } />
                            <stop offset="100%" stopColor={ `hsl(${ pointers[0].value }, 50%, 20%)` } />
                        </linearGradient>
                    </>
                }
            />
        );
    };

    const slider = ReactDOM.createRoot($slider);
    slider.render(
        <React.StrictMode>
            <Component />
        </React.StrictMode>
    );
};

const initHorseshoeSlider = () => {
    const $slider = document.getElementById('horseshoe-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        return (
            <RoundSlider
                animateOnClick={ true }
                pathStartAngle={ 150 }
                pathEndAngle={ 30 }

                pathBgColor={ '#2C2C2F' }
                pathThickness={ 15 }
                connectionBgColor={ 'url(#horseshoe-slider-gradient)' }

                pointerBgColor={ '#fff' }
                pointerBgColorSelected={ '#eeeeee' }
                pointerRadius={ 20 }

                enableTicks={ true }
                ticksCount={ 100 }
                ticksGroupSize={ 10 }
                ticksWidth={ 1 }
                ticksDistanceToPanel={ 5 }
                tickValuesDistance={ 20 }
                tickValuesColor={ '#e1e1e1' }

                textColor={ '#fff' }
                textFontSize={ 24 }
                textSuffix={ '“' }
                textPrefix={ ' '}

                min={ 0 }
                max={ 100 }

                pointers={[
                    {
                        value: 0,
                    },
                    {
                        value: 50,
                    }
                ]}

                SvgDefs={
                    <>
                        <linearGradient id="horseshoe-slider-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#2d95a8" />
                            <stop offset="50%" stopColor="#67CD67" />
                            <stop offset="100%" stopColor="#cccc68" />
                        </linearGradient>
                    </>
                }
            />
        );
    };

    const slider = ReactDOM.createRoot($slider);
    slider.render(
        <React.StrictMode>
            <Component />
        </React.StrictMode>
    );
};

const cssFrameworksSlider = () => {
    const $slider = document.getElementById('css-frameworks-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        return (
            <RoundSlider
                animateOnClick={ true }

                pointers={[
                    {
                        value: 0,
                    },
                    {
                        value: 25,
                    },
                    {
                        value: 50,
                    }
                ]}

                pathStartAngle={ 0 }
                pathEndAngle={ 180 }

                textColor={ '#94A3B8' }
                textOffsetY={ 20 }
                textFontSize={ 24 }
                textBetween={ ' • ' }

                pointerRadius={ 15 }
                pointerBgColorSelected={ '#98d32a' }

                connectionBgColorHover={ '#4a96b6' }

                enableTicks={ true }
                ticksCount={ 50 }
                ticksWidth={ 2 }
                ticksColor={ '#94A3B8' }
                tickValuesColor={ '#94A3B8' }

                /*

                SvgDefs={
                    <>
                        <linearGradient id="horseshoe-slider-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#2d95a8" />
                            <stop offset="50%" stopColor="#67CD67" />
                            <stop offset="100%" stopColor="#cccc68" />
                        </linearGradient>
                    </>
                }*/
            />
        );
    };

    const slider = ReactDOM.createRoot($slider);
    slider.render(
        <React.StrictMode>
            <Component />
        </React.StrictMode>
    );
};

const advancedFeaturesSlider = () => {
    const $slider = document.getElementById('advanced-features-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        return (
            <RoundSlider
                animateOnClick={ true }

                pointers={[
                    {
                        value: 20,
                    },
                    {
                        value: 80,
                    }
                ]}

                pathStartAngle={ 0 }
                pathEndAngle={ 270 }

                textColor={ '#94A3B8' }
                textOffsetY={ 20 }
                textFontSize={ 24 }
                textBetween={ ' / ' }

                pointerRadius={ 15 }
                pointerBgColor={ 'url(#advanced-features-slider-gradient)' }
                pointerBgColorSelected={ 'url(#advanced-features-slider-gradient-2)' }

                enableTicks={ true }
                ticksCount={ 50 }
                ticksWidth={ 2 }
                ticksColor={ '#94A3B8' }
                tickValuesColor={ '#94A3B8' }

                SvgDefs={
                    <>
                        <radialGradient id="advanced-features-slider-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#B595EE" />
                            <stop offset="100%" stopColor="#4D2852" />
                        </radialGradient>
                        <radialGradient id="advanced-features-slider-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#B595EE" />
                            <stop offset="80%" stopColor="#4D2852" />
                        </radialGradient>
                    </>
                }
            />
        );
    };

    const slider = ReactDOM.createRoot($slider);
    slider.render(
        <React.StrictMode>
            <Component />
        </React.StrictMode>
    );
};

export const initHomePage = () => {
    if(hljs){
        hljs.highlightAll();
    }

    initColorSlider();
    initHorseshoeSlider();
    cssFrameworksSlider();
    advancedFeaturesSlider();
};