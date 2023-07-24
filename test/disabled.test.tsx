import { render } from '@testing-library/react';
import { RoundSlider } from '../src/core';

describe('Disabled', () => {
    test('Disabled Slider', () => {
        const { container} = render(
            <RoundSlider disabled={ true } />
        );
        const $svg = container.querySelector('svg') as SVGSVGElement;
        expect($svg.classList.contains('mz-round-slider-disabled')).toStrictEqual(true);
        expect($svg.getAttribute('aria-disabled')).toStrictEqual('true');
    });

    test('Non Disabled Slider', () => {
        const { container} = render(
            <RoundSlider />
        );
        const $svg = container.querySelector('svg') as SVGSVGElement;
        expect($svg.classList.contains('mz-round-slider-disabled')).toStrictEqual(false);
        expect($svg.getAttribute('aria-disabled')).toStrictEqual(null);
    });

    test('2 pointers of 4 should be disabled', () => {
        const { container} = render(
            <RoundSlider
                pointers={[
                    {
                        radius: 50,
                        value: 5,
                        bgColor: 'blue',
                        disabled: true,
                    },

                    {
                        radius: 15,
                        value: 10,
                    },

                    {
                        radius: 55,
                        value: 15,
                        disabled: true
                    },

                    {
                        radius: 25,
                        value: 20
                    },

                ]}
            />
        );
        const $svg = container.querySelector('svg') as SVGSVGElement;
        const $firstPointer = $svg.querySelector('[data-type="pointer"][data-index="0"]') as SVGElement;
        const $secondPointer = $svg.querySelector('[data-type="pointer"][data-index="1"]') as SVGElement;
        const $thirdPointer = $svg.querySelector('[data-type="pointer"][data-index="2"]') as SVGElement;
        const $fourthPointer = $svg.querySelector('[data-type="pointer"][data-index="3"]') as SVGElement;

        expect($firstPointer.classList.contains('mz-round-slider-pointer-disabled')).toStrictEqual(true);
        expect($secondPointer.classList.contains('mz-round-slider-pointer-disabled')).toStrictEqual(false);
        expect($thirdPointer.classList.contains('mz-round-slider-pointer-disabled')).toStrictEqual(true);
        expect($fourthPointer.classList.contains('mz-round-slider-pointer-disabled')).toStrictEqual(false);

        expect($firstPointer.getAttribute('aria-disabled')).toStrictEqual('true');
        expect($secondPointer.hasAttribute('aria-disabled')).toStrictEqual(false);
        expect($thirdPointer.getAttribute('aria-disabled')).toStrictEqual('true');
        expect($fourthPointer.hasAttribute('aria-disabled')).toStrictEqual(false);
    });


});