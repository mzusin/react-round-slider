import { render } from '@testing-library/react';
import { RoundSlider } from '../src/core'; // https://testing-library.com/docs/dom-testing-library/api-events/

describe('Rendering', () => {
    test('When no params: SVG should exist', () => {
        const { container} = render(
            <RoundSlider />
        );
        const $svg = container.querySelector('svg') as SVGSVGElement;
        expect($svg).toBeDefined();
    });
});