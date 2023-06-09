import { getSVGCenter } from '../src/core/domain/svg-provider';
import { Vector2 } from 'mz-math';

describe('getSVGCenter()', () => {

    test('svg = [100, 80], max pointer = [50, 40], stroke = 10', () => {
        const svgRadii: Vector2 = [100, 80];
        const maxPointerRadii: Vector2 = [50, 40];
        const strokeWidth = 10;
        expect(getSVGCenter(svgRadii, maxPointerRadii, strokeWidth)).toStrictEqual([150, 120]);
    });

    test('svg = [100, 80], max pointer = [200, 160], stroke = 10', () => {
        const svgRadii: Vector2 = [100, 80];
        const maxPointerRadii: Vector2 = [200, 160];
        const strokeWidth = 10;
        expect(getSVGCenter(svgRadii, maxPointerRadii, strokeWidth)).toStrictEqual([300, 240]);
    });

    test('svg = [100, 80], max pointer = [200, 160], stroke = 0', () => {
        const svgRadii: Vector2 = [100, 80];
        const maxPointerRadii: Vector2 = [200, 160];
        const strokeWidth = 0;
        expect(getSVGCenter(svgRadii, maxPointerRadii, strokeWidth)).toStrictEqual([300, 240]);
    });

    test('svg = [100, 80], max pointer = [50, 40], stroke = 5', () => {
        const svgRadii: Vector2 = [100, 80];
        const maxPointerRadii: Vector2 = [50, 40];
        const strokeWidth = 5;
        expect(getSVGCenter(svgRadii, maxPointerRadii, strokeWidth)).toStrictEqual([150, 120]);
    });

    test('svg = [100, 80], max pointer = [50, 40], stroke = 1', () => {
        const svgRadii: Vector2 = [100, 80];
        const maxPointerRadii: Vector2 = [50, 40];
        const strokeWidth = 1;
        expect(getSVGCenter(svgRadii, maxPointerRadii, strokeWidth)).toStrictEqual([150, 120]);
    });

    test('svg = [100, 80], max pointer = [50, 40], stroke = 0', () => {
        const svgRadii: Vector2 = [100, 80];
        const maxPointerRadii: Vector2 = [50, 40];
        const strokeWidth = 0;
        expect(getSVGCenter(svgRadii, maxPointerRadii, strokeWidth)).toStrictEqual([150, 120]);
    });
});