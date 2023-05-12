// https://testing-library.com/docs/dom-testing-library/api-events/
import { cleanup, render } from '@testing-library/react';
import { RoundSlider } from '../src/core';

afterEach(cleanup);

describe('Basic Rendering', () => {

    describe('Basic Rendering: Circle Slider', () => {

        test('Slider without parameters', () => {

            const { container} = render(
                <RoundSlider />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('150');
            expect($svg.getAttribute('height')).toStrictEqual('150');

            expect($path.getAttribute('d')).toStrictEqual('M 325 215 A 150 200 0 0 1 25 215.00000000000003');
            expect($path.getAttribute('stroke')).toStrictEqual('#efefef');
            expect($path.getAttribute('stroke-width')).toStrictEqual('5');
            expect($path.getAttribute('fill')).toStrictEqual('none');
            expect($path.getAttribute('shape-rendering')).toStrictEqual('geometricPrecision');
            expect($path.getAttribute('stroke-linecap')).toStrictEqual('round');
            expect($path.getAttribute('cursor')).toStrictEqual('pointer');

            expect($ellipse.getAttribute('cx')).toStrictEqual('75');
            expect($ellipse.getAttribute('cy')).toStrictEqual('75');
            expect($ellipse.getAttribute('rx')).toStrictEqual('10');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
            expect($ellipse.getAttribute('fill')).toStrictEqual('#000');
            expect($ellipse.getAttribute('cursor')).toStrictEqual('pointer');
        });

        test('Circle slider 0 ----> 360 degrees with round pointer', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 150 }

                    startAngleDegrees={ 0 }
                    endAngleDegrees={ 360 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 25,
                            ry: 25,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('350');
            expect($svg.getAttribute('height')).toStrictEqual('350');
            expect($path.getAttribute('d')).toStrictEqual('M 325 175 A 150 150 0 1 1 324.9999999771537 174.99738200612214');
            expect($ellipse.getAttribute('cx')).toStrictEqual('325');
            expect($ellipse.getAttribute('cy')).toStrictEqual('175');
            expect($ellipse.getAttribute('rx')).toStrictEqual('25');
            expect($ellipse.getAttribute('ry')).toStrictEqual('25');
        });

        test('Circle slider 0 ----> 180 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 0 }
                    endAngleDegrees={ 180 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 25,
                            ry: 15,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('350');
            expect($svg.getAttribute('height')).toStrictEqual('430');
            expect($path.getAttribute('d')).toStrictEqual('M 325 215 A 150 200 0 0 1 25 215.00000000000003');
            expect($ellipse.getAttribute('cx')).toStrictEqual('325');
            expect($ellipse.getAttribute('cy')).toStrictEqual('215');
            expect($ellipse.getAttribute('rx')).toStrictEqual('25');
            expect($ellipse.getAttribute('ry')).toStrictEqual('15');
        });

        test('Circle slider 180 ----> 0 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 180 }
                    endAngleDegrees={ 0 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');
            expect($path.getAttribute('d')).toStrictEqual('M 20 210.00000000000003 A 150 200 0 0 1 320 209.99999999999994');
            expect($ellipse.getAttribute('cx')).toStrictEqual('20');
            expect($ellipse.getAttribute('cy')).toStrictEqual('210.00000000000003');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
        });

        test('Circle slider 180 ----> 360 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 180 }
                    endAngleDegrees={ 360 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');
            expect($path.getAttribute('d')).toStrictEqual('M 20 210.00000000000003 A 150 200 0 0 1 320 209.99999999999994');
            expect($ellipse.getAttribute('cx')).toStrictEqual('20');
            expect($ellipse.getAttribute('cy')).toStrictEqual('210.00000000000003');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
        });

        test('Circle slider 0 ----> 90 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 0 }
                    endAngleDegrees={ 90 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');
            expect($path.getAttribute('d')).toStrictEqual('M 320 210 A 150 200 0 0 1 170 410');
            expect($ellipse.getAttribute('cx')).toStrictEqual('320');
            expect($ellipse.getAttribute('cy')).toStrictEqual('210');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
        });

        test('Circle slider 90 ----> 270 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 90 }
                    endAngleDegrees={ 270 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');
            expect($path.getAttribute('d')).toStrictEqual('M 170 410 A 150 200 0 0 1 169.99999999999997 10');
            expect($ellipse.getAttribute('cx')).toStrictEqual('170');
            expect($ellipse.getAttribute('cy')).toStrictEqual('410');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
        });

        test('Circle slider 180 ----> 270 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 180 }
                    endAngleDegrees={ 270 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');
            expect($path.getAttribute('d')).toStrictEqual('M 20 210.00000000000003 A 150 200 0 0 1 169.99999999999997 10');
            expect($ellipse.getAttribute('cx')).toStrictEqual('20');
            expect($ellipse.getAttribute('cy')).toStrictEqual('210.00000000000003');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
        });

        test('Circle slider 270 ----> 0 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 270 }
                    endAngleDegrees={ 0 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');
            expect($path.getAttribute('d')).toStrictEqual('M 169.99999999999997 10 A 150 200 0 0 1 320 209.99999999999994');
            expect($ellipse.getAttribute('cx')).toStrictEqual('169.99999999999997');
            expect($ellipse.getAttribute('cy')).toStrictEqual('10');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
        });

        test('Circle slider 0 ---> 360 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 0 }
                    endAngleDegrees={ 360 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');
            expect($path.getAttribute('d')).toStrictEqual('M 320 210 A 150 200 0 1 1 319.9999999771537 209.9965093414962');
            expect($ellipse.getAttribute('cx')).toStrictEqual('320');
            expect($ellipse.getAttribute('cy')).toStrictEqual('210');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
        });

        test('Circle slider 200 ---> 40 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 200 }
                    endAngleDegrees={ 40 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');
            expect($path.getAttribute('d')).toStrictEqual('M 29.046106882113747 141.59597133486625 A 150 200 0 1 1 284.9066664678467 338.5575219373078');
            expect($ellipse.getAttribute('cx')).toStrictEqual('29.046106882113747');
            expect($ellipse.getAttribute('cy')).toStrictEqual('141.59597133486625');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
        });

        test('Circle slider -80 ---> 0 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ -80 }
                    endAngleDegrees={ 0 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');
            expect($path.getAttribute('d')).toStrictEqual('M 196.0472266500395 13.038449397558367 A 150 200 0 0 1 320 209.99999999999994');
            expect($ellipse.getAttribute('cx')).toStrictEqual('196.0472266500395');
            expect($ellipse.getAttribute('cy')).toStrictEqual('13.038449397558367');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
        });

        test('Circle slider 270 ---> 360 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 270 }
                    endAngleDegrees={ 360 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');
            expect($path.getAttribute('d')).toStrictEqual('M 169.99999999999997 10 A 150 200 0 0 1 320 209.99999999999994');
            expect($ellipse.getAttribute('cx')).toStrictEqual('169.99999999999997');
            expect($ellipse.getAttribute('cy')).toStrictEqual('10');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
        });

        test('Circle slider 270 ---> 270 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 270 }
                    endAngleDegrees={ 270 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');
            expect($path.getAttribute('d')).toStrictEqual('M 169.99999999999997 10 A 150 200 0 1 1 169.9973820061221 10.000000030461734');
            expect($ellipse.getAttribute('cx')).toStrictEqual('169.99999999999997');
            expect($ellipse.getAttribute('cy')).toStrictEqual('10');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
        });

        test('Circle slider 270 ---> 200 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 270 }
                    endAngleDegrees={ 200 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');
            expect($path.getAttribute('d')).toStrictEqual('M 169.99999999999997 10 A 150 200 0 1 1 29.04610688211369 141.59597133486642');
            expect($ellipse.getAttribute('cx')).toStrictEqual('169.99999999999997');
            expect($ellipse.getAttribute('cy')).toStrictEqual('10');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
        });

        test('Circle slider 630 ---> 560 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 630 }
                    endAngleDegrees={ 560 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');
            expect($path.getAttribute('d')).toStrictEqual('M 169.99999999999997 10 A 150 200 0 1 1 29.04610688211369 141.59597133486642');
            expect($ellipse.getAttribute('cx')).toStrictEqual('169.99999999999997');
            expect($ellipse.getAttribute('cy')).toStrictEqual('10');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
        });
    });

    describe('Basic Rendering: Ellipse Slider', () => {

        test('Ellipse slider 0 ----> 180 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 0 }
                    endAngleDegrees={ 180 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 25,
                            ry: 15,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('350');
            expect($svg.getAttribute('height')).toStrictEqual('430');

            expect($path.getAttribute('d')).toStrictEqual('M 325 215 A 150 200 0 0 1 25 215.00000000000003');
            expect($path.getAttribute('stroke')).toStrictEqual('#285f68');
            expect($path.getAttribute('stroke-width')).toStrictEqual('15');
            expect($path.getAttribute('fill')).toStrictEqual('none');
            expect($path.getAttribute('shape-rendering')).toStrictEqual('geometricPrecision');
            expect($path.getAttribute('stroke-linecap')).toStrictEqual('round');
            expect($path.getAttribute('cursor')).toStrictEqual('pointer');

            expect($ellipse.getAttribute('cx')).toStrictEqual('325');
            expect($ellipse.getAttribute('cy')).toStrictEqual('215');
            expect($ellipse.getAttribute('rx')).toStrictEqual('25');
            expect($ellipse.getAttribute('ry')).toStrictEqual('15');
            expect($ellipse.getAttribute('fill')).toStrictEqual('#000');
            expect($ellipse.getAttribute('cursor')).toStrictEqual('pointer');
        });

        test('Ellipse slider 180 ----> 0 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 180 }
                    endAngleDegrees={ 0 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');

            expect($path.getAttribute('d')).toStrictEqual('M 20 210.00000000000003 A 150 200 0 0 1 320 209.99999999999994');
            expect($path.getAttribute('stroke')).toStrictEqual('#285f68');
            expect($path.getAttribute('stroke-width')).toStrictEqual('15');
            expect($path.getAttribute('fill')).toStrictEqual('none');
            expect($path.getAttribute('shape-rendering')).toStrictEqual('geometricPrecision');
            expect($path.getAttribute('stroke-linecap')).toStrictEqual('round');
            expect($path.getAttribute('cursor')).toStrictEqual('pointer');

            expect($ellipse.getAttribute('cx')).toStrictEqual('20');
            expect($ellipse.getAttribute('cy')).toStrictEqual('210.00000000000003');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
            expect($ellipse.getAttribute('fill')).toStrictEqual('#000');
            expect($ellipse.getAttribute('cursor')).toStrictEqual('pointer');
        });

        test('Ellipse slider 180 ----> 360 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 180 }
                    endAngleDegrees={ 360 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');

            expect($path.getAttribute('d')).toStrictEqual('M 20 210.00000000000003 A 150 200 0 0 1 320 209.99999999999994');
            expect($path.getAttribute('stroke')).toStrictEqual('#285f68');
            expect($path.getAttribute('stroke-width')).toStrictEqual('15');
            expect($path.getAttribute('fill')).toStrictEqual('none');
            expect($path.getAttribute('shape-rendering')).toStrictEqual('geometricPrecision');
            expect($path.getAttribute('stroke-linecap')).toStrictEqual('round');
            expect($path.getAttribute('cursor')).toStrictEqual('pointer');

            expect($ellipse.getAttribute('cx')).toStrictEqual('20');
            expect($ellipse.getAttribute('cy')).toStrictEqual('210.00000000000003');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
            expect($ellipse.getAttribute('fill')).toStrictEqual('#000');
            expect($ellipse.getAttribute('cursor')).toStrictEqual('pointer');
        });

        test('Ellipse slider 0 ----> 90 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 0 }
                    endAngleDegrees={ 90 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');

            expect($path.getAttribute('d')).toStrictEqual('M 320 210 A 150 200 0 0 1 170 410');
            expect($path.getAttribute('stroke')).toStrictEqual('#285f68');
            expect($path.getAttribute('stroke-width')).toStrictEqual('15');
            expect($path.getAttribute('fill')).toStrictEqual('none');
            expect($path.getAttribute('shape-rendering')).toStrictEqual('geometricPrecision');
            expect($path.getAttribute('stroke-linecap')).toStrictEqual('round');
            expect($path.getAttribute('cursor')).toStrictEqual('pointer');

            expect($ellipse.getAttribute('cx')).toStrictEqual('320');
            expect($ellipse.getAttribute('cy')).toStrictEqual('210');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
            expect($ellipse.getAttribute('fill')).toStrictEqual('#000');
            expect($ellipse.getAttribute('cursor')).toStrictEqual('pointer');
        });

        test('Ellipse slider 90 ----> 270 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 90 }
                    endAngleDegrees={ 270 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');

            expect($path.getAttribute('d')).toStrictEqual('M 170 410 A 150 200 0 0 1 169.99999999999997 10');
            expect($path.getAttribute('stroke')).toStrictEqual('#285f68');
            expect($path.getAttribute('stroke-width')).toStrictEqual('15');
            expect($path.getAttribute('fill')).toStrictEqual('none');
            expect($path.getAttribute('shape-rendering')).toStrictEqual('geometricPrecision');
            expect($path.getAttribute('stroke-linecap')).toStrictEqual('round');
            expect($path.getAttribute('cursor')).toStrictEqual('pointer');

            expect($ellipse.getAttribute('cx')).toStrictEqual('170');
            expect($ellipse.getAttribute('cy')).toStrictEqual('410');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
            expect($ellipse.getAttribute('fill')).toStrictEqual('#000');
            expect($ellipse.getAttribute('cursor')).toStrictEqual('pointer');
        });

        test('Ellipse slider 180 ----> 270 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 180 }
                    endAngleDegrees={ 270 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');

            expect($path.getAttribute('d')).toStrictEqual('M 20 210.00000000000003 A 150 200 0 0 1 169.99999999999997 10');
            expect($path.getAttribute('stroke')).toStrictEqual('#285f68');
            expect($path.getAttribute('stroke-width')).toStrictEqual('15');
            expect($path.getAttribute('fill')).toStrictEqual('none');
            expect($path.getAttribute('shape-rendering')).toStrictEqual('geometricPrecision');
            expect($path.getAttribute('stroke-linecap')).toStrictEqual('round');
            expect($path.getAttribute('cursor')).toStrictEqual('pointer');

            expect($ellipse.getAttribute('cx')).toStrictEqual('20');
            expect($ellipse.getAttribute('cy')).toStrictEqual('210.00000000000003');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
            expect($ellipse.getAttribute('fill')).toStrictEqual('#000');
            expect($ellipse.getAttribute('cursor')).toStrictEqual('pointer');
        });

        test('Ellipse slider 270 ----> 0 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 270 }
                    endAngleDegrees={ 0 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');

            expect($path.getAttribute('d')).toStrictEqual('M 169.99999999999997 10 A 150 200 0 0 1 320 209.99999999999994');
            expect($path.getAttribute('stroke')).toStrictEqual('#285f68');
            expect($path.getAttribute('stroke-width')).toStrictEqual('15');
            expect($path.getAttribute('fill')).toStrictEqual('none');
            expect($path.getAttribute('shape-rendering')).toStrictEqual('geometricPrecision');
            expect($path.getAttribute('stroke-linecap')).toStrictEqual('round');
            expect($path.getAttribute('cursor')).toStrictEqual('pointer');

            expect($ellipse.getAttribute('cx')).toStrictEqual('169.99999999999997');
            expect($ellipse.getAttribute('cy')).toStrictEqual('10');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
            expect($ellipse.getAttribute('fill')).toStrictEqual('#000');
            expect($ellipse.getAttribute('cursor')).toStrictEqual('pointer');
        });

        test('Ellipse slider 0 ---> 360 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 0 }
                    endAngleDegrees={ 360 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');

            expect($path.getAttribute('d')).toStrictEqual('M 320 210 A 150 200 0 1 1 319.9999999771537 209.9965093414962');
            expect($path.getAttribute('stroke')).toStrictEqual('#285f68');
            expect($path.getAttribute('stroke-width')).toStrictEqual('15');
            expect($path.getAttribute('fill')).toStrictEqual('none');
            expect($path.getAttribute('shape-rendering')).toStrictEqual('geometricPrecision');
            expect($path.getAttribute('stroke-linecap')).toStrictEqual('round');
            expect($path.getAttribute('cursor')).toStrictEqual('pointer');

            expect($ellipse.getAttribute('cx')).toStrictEqual('320');
            expect($ellipse.getAttribute('cy')).toStrictEqual('210');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
            expect($ellipse.getAttribute('fill')).toStrictEqual('#000');
            expect($ellipse.getAttribute('cursor')).toStrictEqual('pointer');
        });

        test('Ellipse slider 200 ---> 40 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 200 }
                    endAngleDegrees={ 40 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');

            expect($path.getAttribute('d')).toStrictEqual('M 29.046106882113747 141.59597133486625 A 150 200 0 1 1 284.9066664678467 338.5575219373078');
            expect($path.getAttribute('stroke')).toStrictEqual('#285f68');
            expect($path.getAttribute('stroke-width')).toStrictEqual('15');
            expect($path.getAttribute('fill')).toStrictEqual('none');
            expect($path.getAttribute('shape-rendering')).toStrictEqual('geometricPrecision');
            expect($path.getAttribute('stroke-linecap')).toStrictEqual('round');
            expect($path.getAttribute('cursor')).toStrictEqual('pointer');

            expect($ellipse.getAttribute('cx')).toStrictEqual('29.046106882113747');
            expect($ellipse.getAttribute('cy')).toStrictEqual('141.59597133486625');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
            expect($ellipse.getAttribute('fill')).toStrictEqual('#000');
            expect($ellipse.getAttribute('cursor')).toStrictEqual('pointer');
        });

        test('Ellipse slider -80 ---> 0 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ -80 }
                    endAngleDegrees={ 0 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');

            expect($path.getAttribute('d')).toStrictEqual('M 196.0472266500395 13.038449397558367 A 150 200 0 0 1 320 209.99999999999994');
            expect($path.getAttribute('stroke')).toStrictEqual('#285f68');
            expect($path.getAttribute('stroke-width')).toStrictEqual('15');
            expect($path.getAttribute('fill')).toStrictEqual('none');
            expect($path.getAttribute('shape-rendering')).toStrictEqual('geometricPrecision');
            expect($path.getAttribute('stroke-linecap')).toStrictEqual('round');
            expect($path.getAttribute('cursor')).toStrictEqual('pointer');

            expect($ellipse.getAttribute('cx')).toStrictEqual('196.0472266500395');
            expect($ellipse.getAttribute('cy')).toStrictEqual('13.038449397558367');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
            expect($ellipse.getAttribute('fill')).toStrictEqual('#000');
            expect($ellipse.getAttribute('cursor')).toStrictEqual('pointer');
        });

        test('Ellipse slider 270 ---> 360 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 270 }
                    endAngleDegrees={ 360 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');

            expect($path.getAttribute('d')).toStrictEqual('M 169.99999999999997 10 A 150 200 0 0 1 320 209.99999999999994');
            expect($path.getAttribute('stroke')).toStrictEqual('#285f68');
            expect($path.getAttribute('stroke-width')).toStrictEqual('15');
            expect($path.getAttribute('fill')).toStrictEqual('none');
            expect($path.getAttribute('shape-rendering')).toStrictEqual('geometricPrecision');
            expect($path.getAttribute('stroke-linecap')).toStrictEqual('round');
            expect($path.getAttribute('cursor')).toStrictEqual('pointer');

            expect($ellipse.getAttribute('cx')).toStrictEqual('169.99999999999997');
            expect($ellipse.getAttribute('cy')).toStrictEqual('10');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
            expect($ellipse.getAttribute('fill')).toStrictEqual('#000');
            expect($ellipse.getAttribute('cursor')).toStrictEqual('pointer');
        });

        test('Ellipse slider 270 ---> 270 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 270 }
                    endAngleDegrees={ 270 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');

            expect($path.getAttribute('d')).toStrictEqual('M 169.99999999999997 10 A 150 200 0 1 1 169.9973820061221 10.000000030461734');
            expect($path.getAttribute('stroke')).toStrictEqual('#285f68');
            expect($path.getAttribute('stroke-width')).toStrictEqual('15');
            expect($path.getAttribute('fill')).toStrictEqual('none');
            expect($path.getAttribute('shape-rendering')).toStrictEqual('geometricPrecision');
            expect($path.getAttribute('stroke-linecap')).toStrictEqual('round');
            expect($path.getAttribute('cursor')).toStrictEqual('pointer');

            expect($ellipse.getAttribute('cx')).toStrictEqual('169.99999999999997');
            expect($ellipse.getAttribute('cy')).toStrictEqual('10');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
            expect($ellipse.getAttribute('fill')).toStrictEqual('#000');
            expect($ellipse.getAttribute('cursor')).toStrictEqual('pointer');
        });

        test('Ellipse slider 270 ---> 200 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 270 }
                    endAngleDegrees={ 200 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');

            expect($path.getAttribute('d')).toStrictEqual('M 169.99999999999997 10 A 150 200 0 1 1 29.04610688211369 141.59597133486642');
            expect($path.getAttribute('stroke')).toStrictEqual('#285f68');
            expect($path.getAttribute('stroke-width')).toStrictEqual('15');
            expect($path.getAttribute('fill')).toStrictEqual('none');
            expect($path.getAttribute('shape-rendering')).toStrictEqual('geometricPrecision');
            expect($path.getAttribute('stroke-linecap')).toStrictEqual('round');
            expect($path.getAttribute('cursor')).toStrictEqual('pointer');

            expect($ellipse.getAttribute('cx')).toStrictEqual('169.99999999999997');
            expect($ellipse.getAttribute('cy')).toStrictEqual('10');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
            expect($ellipse.getAttribute('fill')).toStrictEqual('#000');
            expect($ellipse.getAttribute('cursor')).toStrictEqual('pointer');
        });

        test('Ellipse slider 630 ---> 560 degrees', () => {

            const { container} = render(
                <RoundSlider
                    rx={ 150 }
                    ry={ 200 }

                    startAngleDegrees={ 630 }
                    endAngleDegrees={ 560 }

                    strokeWidth={ 15 }
                    bgColor="#285f68"

                    pointers={[
                        {
                            rx: 20,
                            ry: 10,
                        }
                    ]}
                />
            );
            const $svg = container.querySelector('svg') as SVGSVGElement;
            const $path = container.querySelector('path') as SVGPathElement;
            const $ellipse = container.querySelector('ellipse') as SVGEllipseElement;

            expect($svg.getAttribute('width')).toStrictEqual('340');
            expect($svg.getAttribute('height')).toStrictEqual('420');

            expect($path.getAttribute('d')).toStrictEqual('M 169.99999999999997 10 A 150 200 0 1 1 29.04610688211369 141.59597133486642');
            expect($path.getAttribute('stroke')).toStrictEqual('#285f68');
            expect($path.getAttribute('stroke-width')).toStrictEqual('15');
            expect($path.getAttribute('fill')).toStrictEqual('none');
            expect($path.getAttribute('shape-rendering')).toStrictEqual('geometricPrecision');
            expect($path.getAttribute('stroke-linecap')).toStrictEqual('round');
            expect($path.getAttribute('cursor')).toStrictEqual('pointer');

            expect($ellipse.getAttribute('cx')).toStrictEqual('169.99999999999997');
            expect($ellipse.getAttribute('cy')).toStrictEqual('10');
            expect($ellipse.getAttribute('rx')).toStrictEqual('20');
            expect($ellipse.getAttribute('ry')).toStrictEqual('10');
            expect($ellipse.getAttribute('fill')).toStrictEqual('#000');
            expect($ellipse.getAttribute('cursor')).toStrictEqual('pointer');
        });
    });

});