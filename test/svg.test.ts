import { getSVGSize } from '../src/core/domain/svg-provider';
import { Vector2 } from 'mz-math';

describe('SVG', () => {

    describe('getSVGSize()', () => {

        test('svg = [100, 80], max pointer = [50, 40], stroke = 10', () => {
            const svgRadii: Vector2 = [100, 80];
            const maxPointerRadii: Vector2 = [50, 40];
            const strokeWidth = 10;

            expect(getSVGSize(svgRadii, maxPointerRadii, strokeWidth)).toStrictEqual({
                svgWidth: 300,
                svgHeight: 240,
            });
        });

    });
});