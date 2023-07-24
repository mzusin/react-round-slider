import { isAngleInArc } from '../src/core/domain/circle-provider';

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
        expect(result).toBe(true);
    });

    test('isAngleInArc(45, 135, 180)', () => {
        const result = isAngleInArc(45, 135, 180);
        expect(result).toBe(false);
    });

    test('isAngleInArc(270, 90, 45)', () => {
        const result = isAngleInArc(270, 90, 45);
        expect(result).toBe(true);
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