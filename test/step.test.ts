import { getStep } from '../src/core/domain/slider-provider';
import { TStep } from '../types/core/interfaces';

describe('Step', () => {

    const min = 0;
    const max = 100;

    test('getStep(null, 0, 100)', () => {
        expect(getStep(null, min, max)).toBeUndefined();
    });

    test('getStep(undefined, 0, 100)', () => {
        expect(getStep(undefined, min, max)).toBeUndefined();
    });

    test('getStep((_value) => 0, 0, 100)', () => {
        const userStep: TStep = (_value) => 0;
        const result = getStep(userStep, min, max);
        expect(result).toBe(userStep);
    });

    test('getStep(10, 0, 100)', () => {
        const result = getStep(10, min, max);
        expect(result).toBe(10);
    });

    test('getStep(-10, 0, 100)', () => {
        const result = getStep(-10, min, max);
        expect(result).toBe(-10);
    });

    test('getStep(200, 0, 100)', () => {
        const result = getStep(200, min, max);
        expect(result).toBeUndefined();
    });
});