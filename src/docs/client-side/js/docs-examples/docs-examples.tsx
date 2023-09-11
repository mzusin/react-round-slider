import ReactDOM from 'react-dom/client';
import * as React from 'react';
import { RoundSlider } from '../../../../core';
import { useState } from 'react';
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

const gettingStartedSliderTopPoint = () => {
    const $slider = document.getElementById('getting-started-slider-top-point') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
            { value: 0 },
        ]);

        return (
            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 269.999 }
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
                textPrefix={ '' }
                textSuffix={ 'px' }
                textColor={ '#8993B7' }
                textFontSize={ 24 }
                textFontFamily={ 'Helvetica,Arial,sans-serif' }
                textOffsetX={ 0 }
                textOffsetY={ 0 }
                textBetween={ ' • '}

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

                textColor={ '#8993B7' }
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

const customPointerSlider = () => {
    const $slider = document.getElementById('custom-pointer-slider') as HTMLElement;
    if(!$slider) return;

    const Component = () => {

        const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
            { value: 75 },
        ]);

        return (
            <RoundSlider
                pointers={ pointers }
                onChange={ setPointers }
                textColor={ '#8993B7' }
                connectionBgColor={ '#ced3e2' }
                pointerRadius={ 50 }
                pointerSVG={
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="50" height="50" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#8993B7"
                         fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path
                            d="M12 10c-1.32 0 -1.983 .421 -2.931 1.924l-.244 .398l-.395 .688a50.89 50.89 0 0 0 -.141 .254c-.24 .434 -.571 .753 -1.139 1.142l-.55 .365c-.94 .627 -1.432 1.118 -1.707 1.955c-.124 .338 -.196 .853 -.193 1.28c0 1.687 1.198 2.994 2.8 2.994l.242 -.006c.119 -.006 .234 -.017 .354 -.034l.248 -.043l.132 -.028l.291 -.073l.162 -.045l.57 -.17l.763 -.243l.455 -.136c.53 -.15 .94 -.222 1.283 -.222c.344 0 .753 .073 1.283 .222l.455 .136l.764 .242l.569 .171l.312 .084c.097 .024 .187 .045 .273 .062l.248 .043c.12 .017 .235 .028 .354 .034l.242 .006c1.602 0 2.8 -1.307 2.8 -3c0 -.427 -.073 -.939 -.207 -1.306c-.236 -.724 -.677 -1.223 -1.48 -1.83l-.257 -.19l-.528 -.38c-.642 -.47 -1.003 -.826 -1.253 -1.278l-.27 -.485l-.252 -.432c-1.011 -1.696 -1.618 -2.099 -3.053 -2.099z"
                            strokeWidth="0" fill="#8993B7"></path>
                        <path
                            d="M19.78 7h-.03c-1.219 .02 -2.35 1.066 -2.908 2.504c-.69 1.775 -.348 3.72 1.075 4.333c.256 .109 .527 .163 .801 .163c1.231 0 2.38 -1.053 2.943 -2.504c.686 -1.774 .34 -3.72 -1.076 -4.332a2.05 2.05 0 0 0 -.804 -.164z"
                            strokeWidth="0" fill="#8993B7"></path>
                        <path
                            d="M9.025 3c-.112 0 -.185 .002 -.27 .015l-.093 .016c-1.532 .206 -2.397 1.989 -2.108 3.855c.272 1.725 1.462 3.114 2.92 3.114l.187 -.005a1.26 1.26 0 0 0 .084 -.01l.092 -.016c1.533 -.206 2.397 -1.989 2.108 -3.855c-.27 -1.727 -1.46 -3.114 -2.92 -3.114z"
                            strokeWidth="0" fill="#8993B7"></path>
                        <path
                            d="M14.972 3c-1.459 0 -2.647 1.388 -2.916 3.113c-.29 1.867 .574 3.65 2.174 3.867c.103 .013 .2 .02 .296 .02c1.39 0 2.543 -1.265 2.877 -2.883l.041 -.23c.29 -1.867 -.574 -3.65 -2.174 -3.867a2.154 2.154 0 0 0 -.298 -.02z"
                            strokeWidth="0" fill="#8993B7"></path>
                        <path
                            d="M4.217 7c-.274 0 -.544 .054 -.797 .161c-1.426 .615 -1.767 2.562 -1.078 4.335c.563 1.451 1.71 2.504 2.941 2.504c.274 0 .544 -.054 .797 -.161c1.426 -.615 1.767 -2.562 1.078 -4.335c-.563 -1.451 -1.71 -2.504 -2.941 -2.504z"
                            strokeWidth="0" fill="#8993B7"></path>
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

const rangeDraggingSlider = () => {
    const $slider = document.getElementById('range-dragging-slider') as HTMLElement;
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
                rangeDragging={ true }
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
    gettingStartedSliderTopPoint();
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
    customPointerSlider();
    rangeDraggingSlider();
};