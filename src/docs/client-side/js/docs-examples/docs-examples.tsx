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

export const initDocsExamples = () => {
    gettingStartedSlider();
    pointerOptionsSlider();
    pathOptionsSlider();
    dataOptionsSlider();
    valuesListSlider();
};