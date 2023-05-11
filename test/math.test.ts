import { normalizeAngles, isAngleInArc } from '../src/core/domain/angles-provider';
import { DEFAULT_START_ANGLE, DEFAULT_END_ANGLE } from '../src/core/domain/settings-provider';

describe('Math', () => {

    describe('normalizeAngles()', () => {

        test('normalizeAngles() without parameters', () => {
            const expected = [DEFAULT_START_ANGLE, DEFAULT_END_ANGLE];
            expect(normalizeAngles()).toStrictEqual(expected);
        });

        test('normalizeAngles(undefined, -90)', () => {
            const result = normalizeAngles(undefined, -90);
            expect(result).toEqual([0, 270]);
        });

        test('normalizeAngles(270)', () => {
            const result = normalizeAngles(270);
            expect(result).toEqual([270, 540]);
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

    describe('isAngleInArc()', () => {

        test('isAngleInArc(0, 180, 90', () => {
            const result = isAngleInArc(0, 180, 90);
            expect(result).toBe(true);
        });

        test('isAngleInArc(0, 180, 0)', () => {
            const result = isAngleInArc(0, 180, 0);
            expect(result).toBe(true);
        });

        test('isAngleInArc(0, 180, 180)', () => {
            const result = isAngleInArc(0, 180, 180);
            expect(result).toBe(true);
        });

        test('isAngleInArc(0, 360, 360)', () => {
            const result = isAngleInArc(0, 360, 360);
            expect(result).toBe(true);
        });

        test('isAngleInArc(300, 60, 20)', () => {
            const result = isAngleInArc(300, 60, 20);
            expect(result).toBe(false);
        });

        test('isAngleInArc(45, 135, 180)', () => {
            const result = isAngleInArc(45, 135, 180);
            expect(result).toBe(false);
        });

        test('isAngleInArc(270, 90, 45)', () => {
            const result = isAngleInArc(270, 90, 45);
            expect(result).toBe(false);
        });

        test('isAngleInArc(-180, -90, -135)', () => {
            const result = isAngleInArc(-180, -90, -135);
            expect(result).toBe(true);
        });

        test('isAngleInArc(270, -90, -45)', () => {
            const result = isAngleInArc(270, -90, -45);
            expect(result).toBe(false);
        });

        test('isAngleInArc(0, 360, 45)', () => {
            const result = isAngleInArc(0, 360, 45);
            expect(result).toBe(true);
        });

        test('isAngleInArc(270, 90, 3600)', () => {
            const result = isAngleInArc(270, 90, 3600);
            expect(result).toBe(false);
        });
    });
});