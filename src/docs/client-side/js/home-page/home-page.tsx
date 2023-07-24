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

const designSlider = () => {
    const $slider = document.getElementById('design-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([{ value: 37 }]);

        return (
            <RoundSlider
                pointers={ pointers }
                onChange={ setPointers }

                min={ 0 }
                max={ 359 }
                pathRadius={ 120 }

                textColor={ '#94A3B8' }
                textFontSize={ 40 }
                textSuffix={ '°' }
                textPrefix={ ' '}
                textOffsetY={ 10 }

                connectionBgColor={ '#81080a' }

                enableTicks={ true }
                ticksCount={ 36 }
                longerTickValuesOnly={ true }
                ticksGroupSize={ 36 }
                ticksDistanceToPanel={ 36 }
                ticksWidth={ 2 }
                ticksColor={ '#68da1c' }
                showTickValues={ false }

                pointerRadius={ 60 }
                pointerSVG={
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="60"
                         height="60"
                         viewBox="0 0 24 24"
                         strokeWidth="1.5"
                         stroke="currentColor"
                         fill="#ED0004"
                         strokeLinecap="round"
                         strokeLinejoin="round">
                        <g transform={ `rotate(${ pointers[0].value } 12 12)` }>
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path
                                d="M12 18.176a3 3 0 1 1 -4.953 -2.449l-.025 .023a4.502 4.502 0 0 1 1.483 -8.75c1.414 0 2.675 .652 3.5 1.671a4.5 4.5 0 1 1 4.983 7.079a3 3 0 1 1 -4.983 2.25z"></path>
                            <path d="M12 19v-10"></path>
                            <path d="M9 3l3 2l3 -2"></path>
                        </g>
                    </svg>
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

const lettersSlider = () => {
    const $slider = document.getElementById('letters-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        return (
            <RoundSlider
                animateOnClick={ true }

                pointers={[
                    {
                        value: 'a',
                    },
                ]}

                data={[
                    'a', 'b', 'c', 'd', 'e', 'f',
                    'g', 'h', 'i', 'j', 'k', 'l',
                    'm', 'n', 'o', 'p', 'q', 'r',
                    's', 't', 'u', 'v', 'w', 'x',
                    'y', 'z',
                ]}

                pointerBgColor={ '#f19305' }
                pointerBgColorSelected={ '#ffb800' }
                pointerRadius={ 15 }

                textColor={ '#5DAED2' }
                textFontSize={ 30 }
                textFontFamily={ 'Helvetica,Arial,sans-serif' }
                textOffsetY={ 10 }

                enableTicks={ true }
                showTickValues={ true }
                ticksGroupSize={ 1 }
                tickValuesColor={ '#94A3B8' }
                ticksColor={ '#94A3B8' }
                ticksWidth={ 2 }
                ticksHeight={ 5 }
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
    designSlider();
    lettersSlider();
};