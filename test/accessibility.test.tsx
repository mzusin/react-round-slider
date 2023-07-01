import { render } from '@testing-library/react';
import { RoundSlider } from '../src/core';

describe('Accessibility', () => {

    test('aria-label should not exist by default', () => {
        const { container} = render(
            <RoundSlider pointers={[
                {
                    value: 10,
                }
            ]} />
        );
        const $pointer = container.querySelector('svg [data-type="pointer"][data-index="0"]') as SVGElement;
        expect($pointer.getAttribute('aria-label')).toStrictEqual(null);
    });

    test('aria-label value', () => {
        const { container} = render(
            <RoundSlider pointers={[
                {
                    ariaLabel: 'label-1'
                }
            ]} />
        );
        const $pointer = container.querySelector('svg [data-type="pointer"][data-index="0"]') as SVGElement;
        expect($pointer.getAttribute('aria-label')).toStrictEqual('label-1');
    });

});