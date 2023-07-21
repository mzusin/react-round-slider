import ReactDOM from 'react-dom/client';
import * as React from 'react';
import { RoundSlider } from '../../../../core';
import { ReactNode, useState } from 'react';
import { ISettingsPointer } from '../../../../core/domain/settings-provider';

const gettingStartedSlider = () => {
    const $slider = document.getElementById('getting-started-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
            { value: 0 },
            { value: 25 }
        ]);

        return (
            <RoundSlider
                pointers={ pointers }
                onChange={ setPointers }
                textColor={ '#8993B7' }
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

const generalPointerOptionsSlider = () => {
    const $slider = document.getElementById('general-pointer-options-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
            {
                value: 0,
            },
            {
                value: 25,
            },
            {
                value: 50,
            },
            {
                value: 75,
            }
        ]);

        return (
            <RoundSlider
                pointers={ pointers }
                onChange={ setPointers }
                textColor={ '#8993B7' }

                pointerBgColor={ '#d3bbdc' }
                pointerBgColorSelected={ '#45c479' }
                pointerBgColorDisabled={ '#cecece' }
                pointerBgColorHover={ '#56dc8b' }
                pointerBorder={ 2 }
                pointerBorderColor={ '#8e3da4' }
                pointerRadius={ 20 }
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

const pointerOptionsSlider = () => {
    const $slider = document.getElementById('pointer-options-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
            {
                value: 0,
                radius: 25,
                bgColor: '#c20cff',
                bgColorSelected: '#8e3da4',
                border: 1,
                borderColor: '#501062',
            },
            {
                value: 25,
                radius: 20,
                bgColor: '#4be28c',
                bgColorSelected: '#368c75',
                border: 1,
                borderColor: '#226452',
            },
            {
                value: 50,
                radius: 15,
                bgColor: '#5691d5',
                bgColorSelected: '#3173b4',
                border: 1,
                borderColor: '#18388a',
            },
            {
                value: 75,
                radius: 10,
                bgColor: '#ffb800',
                bgColorSelected: '#bd8802',
                border: 1,
                borderColor: '#775403',
            }
        ]);

        return (
            <RoundSlider
                pointers={ pointers }
                onChange={ setPointers }
                textColor={ '#8993B7' }
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

const pathOptionsSlider = () => {
    const $slider = document.getElementById('path-options-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
            {
                value: 50
            }
        ]);

        return (
            <RoundSlider
                pathStartAngle={ 0 }
                pathEndAngle={ 180 }

                pathRadius={ 150 }
                pathThickness={ 15 }

                pathBgColor={ '#efefef' }
                pathInnerBgColor={ '#efefef' }

                pathBorder={ 2 }
                pathBorderColor={ '#28586c' }

                textOffsetY={ 70 }
                textFontSize={ 24 }
                textSuffix={ '°' }
                textPrefix={ ' '}

                pointers={ pointers }
                onChange={ setPointers }
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

const dataOptionsSlider = () => {
    const $slider = document.getElementById('data-options-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
            {
                value: -100
            }
        ]);

        return (
            <RoundSlider
                min={ -100 }
                max={ 100 }
                step={ 0.01 }
                arrowStep={ 1 }
                round={ 2 }
                textColor={ '#8993B7' }

                pointers={ pointers }
                onChange={ setPointers }
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

const valuesListSlider = () => {
    const $slider = document.getElementById('values-list-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
            {
                value: 'a',
            }
        ]);

        return (
            <RoundSlider
                data={[
                    'a', 'b', 'c', 'd', 'e', 'f',
                    'g', 'h', 'i', 'j', 'k', 'l',
                    'm', 'n', 'o', 'p', 'q', 'r',
                    's', 't', 'u', 'v', 'w', 'x',
                    'y', 'z',
                ]}

                textColor={ '#5DAED2' }
                textFontSize={ 24 }
                textFontFamily={ 'Helvetica,Arial,sans-serif' }

                enableTicks={ true }
                showTickValues={ true }
                ticksGroupSize={ 1 }
                tickValuesColor={ '#8993B7' }

                pointers={ pointers }
                onChange={ setPointers }
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

const connectionOptionsSlider = () => {
    const $slider = document.getElementById('connection-options-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
            {
                value: 0
            },

            {
                value: 50
            }
        ]);

        return (
            <RoundSlider
                connectionBgColor={ '#e28bff' }
                connectionBgColorHover={ '#b154cc' }
                connectionBgColorDisabled={ '#969696' }

                pathThickness={ 20 }
                pointerRadius={ 25 }
                pointerBgColor={ '#9c2dd7' }
                pointerBgColorSelected={ '#6b1b96' }

                pointers={ pointers }
                onChange={ setPointers }
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

const textValuesSlider = () => {
    const $slider = document.getElementById('text-values-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
            {
                value: 0
            },

            {
                value: 50
            }
        ]);

        return (
            <RoundSlider
                hideText={ false }
                textPrefix={ ' ' }
                textSuffix={ 'px' }
                textColor={ '#8993B7' }
                textFontSize={ 24 }
                textFontFamily={ 'Helvetica,Arial,sans-serif' }
                textOffsetX={ 0 }
                textOffsetY={ 0 }

                pointers={ pointers }
                onChange={ setPointers }
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

const ticksSettingsSlider = () => {
    const $slider = document.getElementById('ticks-settings-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
            {
                value: 0
            },

            {
                value: 50
            }
        ]);

        return (
            <RoundSlider
                pathStartAngle={ 0 }
                pathEndAngle={ 270 }

                enableTicks={ true }
                ticksWidth={ 3 }
                ticksHeight={ 10 }
                longerTicksHeight={ 25 }
                ticksCount={ 100 }
                ticksGroupSize={ 5 }
                longerTickValuesOnly={ true }
                ticksDistanceToPanel={ 3 }
                ticksColor={ '#efefef' }

                pointers={ pointers }
                onChange={ setPointers }
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

const ticksValuesSlider = () => {
    const $slider = document.getElementById('ticks-values-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
            {
                value: 0
            },

            {
                value: 50
            }
        ]);

        return (
            <RoundSlider
                textPrefix={ ' ' }
                textSuffix={ '°' }
                textColor={ '#5DAED2' }

                enableTicks={ true }
                ticksWidth={ 3 }
                ticksHeight={ 10 }
                longerTicksHeight={ 25 }
                ticksCount={ 100 }
                ticksGroupSize={ 5 }
                ticksDistanceToPanel={ 3 }
                ticksColor={ '#efefef' }

                showTickValues={ true }
                longerTickValuesOnly={ true }
                tickValuesColor={ '#6093a3' }
                tickValuesFontSize={ 11 }
                tickValuesFontFamily={ 'Arial' }
                tickValuesDistance={ 15 }
                tickValuesPrefix={ ' ' }
                tickValuesSuffix={ '°' }

                pointers={ pointers }
                onChange={ setPointers }
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

const animationSettingsSlider = () => {
    const $slider = document.getElementById('animation-settings-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
            { value: 0 },
            { value: 25 }
        ]);

        return (
            <RoundSlider
                pointers={ pointers }
                onChange={ setPointers }
                textColor={ '#8993B7' }
                animateOnClick={ true }
                animationDuration={ 200 }
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

const disabledSettingsSlider = () => {

    const $slider = document.getElementById('disabled-state-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
            { value: 0 },
            { value: 25 }
        ]);

        return (
            <RoundSlider
                pointers={ pointers }
                onChange={ setPointers }
                textColor={ '#8993B7' }
                disabled={ true }
                keyboardDisabled={ true }
                mousewheelDisabled={ true }
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

const circleGradientSlider = () => {

    const $slider = document.getElementById('circle-gradient-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([{ value: 0 }]);

        return (
            <RoundSlider
                pointers={ pointers }
                onChange={ setPointers }

                SvgDefs={
                    <>
                        <linearGradient id="color-slider-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={ `hsl(${ pointers[0].value }, 100%, 40%)` } />
                            <stop offset="100%" stopColor={ `hsl(${ pointers[0].value }, 50%, 20%)` } />
                        </linearGradient>
                    </>
                }

                animateOnClick={ true }
                pathStartAngle={ 150 }
                pathEndAngle={ 30 }

                pathBgColor={ '#d0d0d0' }
                pathThickness={ 5 }
                pathInnerBgColor={ 'url(#color-slider-gradient)' }
                pathInnerBgFull={ true }
                connectionBgColor={ '#939191' }

                pointerBgColor={ '#cbcbcb' }
                pointerBgColorSelected={ '#d7d7d7' }
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

const pointerGradientSlider = () => {

    const $slider = document.getElementById('pointer-gradient-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
            {
                value: 30
            },
            {
                value: 70
            }
        ]);

        return (
            <RoundSlider
                pointers={ pointers }
                onChange={ setPointers }

                SvgDefs={
                    <>
                        <linearGradient id="pointer" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#8e50c4" />
                            <stop offset="100%" stopColor="#422563" />
                        </linearGradient>

                        <linearGradient id="pointer-selected" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f2c832" />
                            <stop offset="100%" stopColor="#f19305" />
                        </linearGradient>

                        <linearGradient id="connection" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#00bc9b" />
                            <stop offset="100%" stopColor="#5eaefd" />
                        </linearGradient>
                    </>
                }

                pointerBgColor={ 'url(#pointer)' }
                pointerBgColorSelected={ 'url(#pointer-selected)' }
                connectionBgColor={ 'url(#connection)' }

                textColor={ '#fff' }
                textFontSize={ 24 }
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

const pointersOverlapSlider = () => {
    const $slider = document.getElementById('pointers-overlap-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
            { value: 0 },
            { value: 25 }
        ]);

        return (
            <RoundSlider
                pointers={ pointers }
                onChange={ setPointers }
                textColor={ '#8993B7' }
                pointersOverlap={ true }
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

export const initDocsExamples = () => {
    gettingStartedSlider();
    generalPointerOptionsSlider();
    pointerOptionsSlider();
    pathOptionsSlider();
    dataOptionsSlider();
    valuesListSlider();
    connectionOptionsSlider();
    textValuesSlider();
    ticksSettingsSlider();
    ticksValuesSlider();
    animationSettingsSlider();
    disabledSettingsSlider();
    circleGradientSlider();
    pointerGradientSlider();
    pointersOverlapSlider();
};