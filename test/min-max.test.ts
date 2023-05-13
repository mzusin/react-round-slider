import { MAX_VALUE_DEFAULT, MIN_VALUE_DEFAULT } from '../src/core/domain/defaults';
import { getMinMax } from '../src/core/domain/slider-provider';

describe('Min/Max', () => {

    test('getMinMax(undefined, undefined)', () => {
        expect(getMinMax(undefined, undefined)).toStrictEqual([MIN_VALUE_DEFAULT, MAX_VALUE_DEFAULT]);
    });

    test('getMinMax(null, null)', () => {
        expect(getMinMax(null, null)).toStrictEqual([MIN_VALUE_DEFAULT, MAX_VALUE_DEFAULT]);
    });

    test('getMinMax(0, 100)', () => {
        expect(getMinMax(0, 100)).toStrictEqual([0, 100]);
    });

    test('getMinMax(1, 50)', () => {
        expect(getMinMax(1, 50)).toStrictEqual([1, 50]);
    });

    test('getMinMax(-1000000, 1000000)', () => {
        expect(getMinMax(-1000000, 1000000)).toStrictEqual([-1000000, 1000000]);
    });

    test('getMinMax(-20, -10)', () => {
        expect(getMinMax(-20, -10)).toStrictEqual([-20, -10]);
    });

    test('getMinMax(200, undefined)', () => {
        expect(getMinMax(200, undefined)).toStrictEqual([200, 300]);
    });

    test('getMinMax(100, 0)', () => {
        expect(getMinMax(100, 0)).toStrictEqual([100, 200]);
    });

    test('getMinMax(-100, null)', () => {
        expect(getMinMax(-100, null)).toStrictEqual([-100, 100]);
    });

    test('getMinMax(200, 100)', () => {
        const result = getMinMax(200, 100);
        expect(result).toStrictEqual([200, 300]);
    });

    test('getMinMax(10, -10)', () => {
        const result = getMinMax(10, -10);
        expect(result).toStrictEqual([10, 110]);
    });

    test('getMinMax(undefined, undefined, [1, 2, 3, 4, 5, 6, 7, 8, 9])', () => {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const result = getMinMax(undefined, undefined, data);
        expect(result).toStrictEqual([0, 8]);
    });

    test('getMinMax(5, 14, [1, 2, 3, 4, 5, 6, 7, 8, 9])', () => {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const result = getMinMax(5, 14, data);
        expect(result).toStrictEqual([4, 8]);
    });

    test('getMinMax(1, 9, [1, 2, 3, 4, 5, 6, 7, 8, 9])', () => {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const result = getMinMax(1, 9, data);
        expect(result).toEqual([0, 8]);
    });

    test('getMinMax(0, 10, [1, 2, 3, 4, 5, 6, 7, 8, 9])', () => {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const result = getMinMax(0, 10, data);
        expect(result).toEqual([0, 8]);
    });

    test('getMinMax("b", "c", ["a", "b", "c", "d"])', () => {
        const data = ["a", "b", "c", "d"];
        const result = getMinMax("b", "c", data);
        expect(result).toEqual([1, 2]);
    });

    test('getMinMax("d", "i", ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"])', () => {
        const data = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
        const result = getMinMax("d", "i", data);
        expect(result).toEqual([3, 8]);
    });
});