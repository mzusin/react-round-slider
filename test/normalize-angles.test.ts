import { DEFAULT_START_ANGLE, DEFAULT_END_ANGLE } from '../src/core/domain/defaults';
import { normalizeAngles } from '../src/core/domain/angles-provider';

describe('normalizeAngles()', () => {

    test('normalizeAngles() without parameters', () => {
        const expected = [ DEFAULT_START_ANGLE, DEFAULT_END_ANGLE ];
        expect(normalizeAngles()).toStrictEqual(expected);
    });

    test('normalizeAngles(undefined, -90)', () => {
        const result = normalizeAngles(undefined, -90);
        expect(result).toEqual([0, 270]);
    });

    test('normalizeAngles(270)', () => {
        const result = normalizeAngles(270);
        expect(result).toEqual([270, 359.999]);
    });

    test('normalizeAngles(100, 450)', () => {
        const result = normalizeAngles(100, 450);
        expect(result).toEqual([100, 450]);
    });

    test('normalizeAngles(270, 90)', () => {
        const result = normalizeAngles(270, 90);
        expect(result).toEqual([270, 450]);
    });

    test('normalizeAngles(-180, 90)', () => {
        const result = normalizeAngles(-180, 90);
        expect(result).toEqual([180, 450]);
    });

    test('normalizeAngles(270, -90)', () => {
        const result = normalizeAngles(270, -90);
        expect(result).toEqual([270, 629.999]);
    });

    test('normalizeAngles(-270, -90)', () => {
        const result = normalizeAngles(-270, -90);
        expect(result).toEqual([90, 270]);
    });

    test('normalizeAngles(720, 1080)', () => {
        const result = normalizeAngles(720, 1080);
        expect(result).toEqual([0, 359.999]);
    });
});