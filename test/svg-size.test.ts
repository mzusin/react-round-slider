import { getSVGSize } from '../src/core/domain/slider-provider';
import { Vector2 } from 'mz-math';

describe('getSVGSize()', () => {

    it('svg = [100, 80], max pointer = [50, 40], stroke = 10', () => {
        const svgRadii: Vector2 = [100, 80];
        const maxPointerRadii: Vector2 = [50, 40];
        const strokeWidth = 10;

        expect(getSVGSize(svgRadii, maxPointerRadii, strokeWidth)).toStrictEqual([300, 240]);
    });

    it('svg = [100, 80], max pointer = [200, 160], stroke = 10', () => {
        const svgRadii: Vector2 = [100, 80];
        const maxPointerRadii: Vector2 = [200, 160];
        const strokeWidth = 10;

        expect(getSVGSize(svgRadii, maxPointerRadii, strokeWidth)).toStrictEqual([600, 480]);
    });

    it('svg = [100, 80], max pointer = [50, 40], stroke = 60', () => {
        const svgRadii: Vector2 = [100, 80];
        const maxPointerRadii: Vector2 = [50, 40];
        const strokeWidth = 60;

        expect(getSVGSize(svgRadii, maxPointerRadii, strokeWidth)).toStrictEqual([300, 240]);
    });

    it('svg = [100, 80], max pointer = [50, 40], stroke = 100', () => {
        const svgRadii: Vector2 = [100, 80];
        const maxPointerRadii: Vector2 = [50, 40];
        const strokeWidth = 100;

        expect(getSVGSize(svgRadii, maxPointerRadii, strokeWidth)).toStrictEqual([300, 260]);
    });

});