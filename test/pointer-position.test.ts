import { Vector2 } from 'mz-math';
import { getPointerPositionByPercent } from '../src/core/domain/slider-provider';

describe('getPointerPositionByPercent()', () => {
    test('returns correct position and angle for percent 50', () => {
        const percent = 50;
        const startAngleDegrees = 0;
        const endAngleDegrees = 180;
        const svgRadii: Vector2 = [100, 100];
        const center: Vector2 = [0, 0];

        const result = getPointerPositionByPercent(percent, startAngleDegrees, endAngleDegrees, svgRadii, center);

        // Perform assertions on the result
        expect(result.position).toEqual([6.123233995736766e-15, 100]);
        expect(result.angleDegrees).toBe(90);
    });

    test('returns correct position and angle for percent 25', () => {
        const percent = 25;
        const startAngleDegrees = 0;
        const endAngleDegrees = 270;
        const svgRadii: Vector2 = [200, 150];
        const center: Vector2 = [50, 50];

        const result = getPointerPositionByPercent(percent, startAngleDegrees, endAngleDegrees, svgRadii, center);

        // Perform assertions on the result
        expect(result.position).toEqual([
            126.53668647301797,
            188.581929876693
        ]);
        expect(result.angleDegrees).toBe(67.5);
    });

    test('returns correct position and angle for percent 75', () => {
        const percent = 75;
        const startAngleDegrees = 90;
        const endAngleDegrees = 270;
        const svgRadii: Vector2 = [50, 50];
        const center: Vector2 = [0, 0];

        const result = getPointerPositionByPercent(percent, startAngleDegrees, endAngleDegrees, svgRadii, center);

        // Perform assertions on the result
        expect(result.position).toEqual([
            -35.35533905932739,
            -35.355339059327356
        ]);
        expect(result.angleDegrees).toBe(225);
    });
});