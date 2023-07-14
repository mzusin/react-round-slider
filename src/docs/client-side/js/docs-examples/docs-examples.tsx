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
};