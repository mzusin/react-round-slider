import { render } from '@testing-library/react';
import { RoundSlider } from '../src/core';

describe('Text', () => {

    test('Default Text', () => {
        const { container} = render(
            <RoundSlider />
        );
        const $text = container.querySelector('svg text') as SVGTextElement;
        expect($text.textContent).toStrictEqual('0');
    });

    test('Hide Text', () => {
        const { container} = render(
            <RoundSlider hideText={ true } />
        );
        const $text = container.querySelector('svg text') as SVGTextElement;
        expect($text).toStrictEqual(null);
    });

    test('Text Round 0', () => {
        const { container} = render(
            <RoundSlider min={ 10.1234 } round={ 0 } />
        );
        const $text = container.querySelector('svg text') as SVGTextElement;
        expect($text.textContent).toStrictEqual('10');
    });

    test('Text Prefix', () => {
        const { container} = render(
            <RoundSlider textPrefix='value = ' />
        );
        const $text = container.querySelector('svg text') as SVGTextElement;
        expect($text.textContent).toStrictEqual('value = 0');
    });

    test('Text Suffix', () => {
        const { container} = render(
            <RoundSlider textSuffix='%' />
        );
        const $text = container.querySelector('svg text') as SVGTextElement;
        expect($text.textContent).toStrictEqual('0%');
    });

});