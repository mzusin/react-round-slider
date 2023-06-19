import { MAX_VALUE_DEFAULT, MIN_VALUE_DEFAULT } from '../src/core/domain/defaults';
import { getMinMax, getMinMaxPointer } from '../src/core/domain/slider-provider';
import { IStatePointer } from '../src/core/interfaces';

describe('Mim/Max', () => {

    describe('getMinMax()', () => {

        it('getMinMax(undefined, undefined)', () => {
            expect(getMinMax(undefined, undefined)).toStrictEqual([MIN_VALUE_DEFAULT, MAX_VALUE_DEFAULT]);
        });

        it('getMinMax(null, null)', () => {
            expect(getMinMax(null, null)).toStrictEqual([MIN_VALUE_DEFAULT, MAX_VALUE_DEFAULT]);
        });

        it('getMinMax(0, 100)', () => {
            expect(getMinMax(0, 100)).toStrictEqual([0, 100]);
        });

        it('getMinMax(1, 50)', () => {
            expect(getMinMax(1, 50)).toStrictEqual([1, 50]);
        });

        it('getMinMax(-1000000, 1000000)', () => {
            expect(getMinMax(-1000000, 1000000)).toStrictEqual([-1000000, 1000000]);
        });

        it('getMinMax(-20, -10)', () => {
            expect(getMinMax(-20, -10)).toStrictEqual([-20, -10]);
        });

        it('getMinMax(200, undefined)', () => {
            expect(getMinMax(200, undefined)).toStrictEqual([200, 300]);
        });

        it('getMinMax(100, 0)', () => {
            expect(getMinMax(100, 0)).toStrictEqual([100, 200]);
        });

        it('getMinMax(-100, null)', () => {
            expect(getMinMax(-100, null)).toStrictEqual([-100, 100]);
        });

        it('getMinMax(200, 100)', () => {
            const result = getMinMax(200, 100);
            expect(result).toStrictEqual([200, 300]);
        });

        it('getMinMax(10, -10)', () => {
            const result = getMinMax(10, -10);
            expect(result).toStrictEqual([10, 110]);
        });

        it('getMinMax(undefined, undefined, [1, 2, 3, 4, 5, 6, 7, 8, 9])', () => {
            const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            const result = getMinMax(undefined, undefined, data);
            expect(result).toStrictEqual([0, 8]);
        });

        it('getMinMax(5, 14, [1, 2, 3, 4, 5, 6, 7, 8, 9])', () => {
            const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            const result = getMinMax(5, 14, data);
            expect(result).toStrictEqual([4, 8]);
        });

        it('getMinMax(1, 9, [1, 2, 3, 4, 5, 6, 7, 8, 9])', () => {
            const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            const result = getMinMax(1, 9, data);
            expect(result).toEqual([0, 8]);
        });

        it('getMinMax(0, 10, [1, 2, 3, 4, 5, 6, 7, 8, 9])', () => {
            const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            const result = getMinMax(0, 10, data);
            expect(result).toEqual([0, 8]);
        });

        it('getMinMax("b", "c", ["a", "b", "c", "d"])', () => {
            const data = ["a", "b", "c", "d"];
            const result = getMinMax("b", "c", data);
            expect(result).toEqual([1, 2]);
        });

        it('getMinMax("d", "i", ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"])', () => {
            const data = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
            const result = getMinMax("d", "i", data);
            expect(result).toEqual([3, 8]);
        });
    });

    describe('getMinMaxPointer()', () => {
        it('returns null for empty pointers array', () => {
            const pointers: IStatePointer[] = [];

            const result = getMinMaxPointer(pointers);

            expect(result).toBeNull();
        });

        it('returns null for single pointer in the array', () => {
            const pointers: IStatePointer[] = [
                {
                    pointerRadii: [50, 50],
                    percent: 50,
                    id: 'pointer1',
                    index: 0, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000'
                },
            ];

            const result = getMinMaxPointer(pointers);

            expect(result).toBeNull();
        });

        it('returns correct min and max pointers for multiple pointers', () => {
            const pointers: IStatePointer[] = [
                {
                    pointerRadii: [50, 50],
                    percent: 25,
                    id: 'pointer1',
                    index: 0, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000'
                },
                {
                    pointerRadii: [50, 50],
                    percent: 75,
                    id: 'pointer2',
                    index: 1, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000'
                },
                {
                    pointerRadii: [50, 50],
                    percent: 50,
                    id: 'pointer3',
                    index: 2, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000'
                },
            ];

            const result = getMinMaxPointer(pointers);

            expect(result).toEqual([
                {
                    pointerRadii: [50, 50],
                    percent: 25,
                    id: 'pointer1',
                    index: 0, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000'
                },
                {
                    pointerRadii: [50, 50],
                    percent: 75,
                    id: 'pointer2',
                    index: 1, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000'
                },
            ]);
        });

        it('returns correct min and max pointers for multiple pointers', () => {
            const pointers: IStatePointer[] = [
                {
                    pointerRadii: [50, 50],
                    percent: 25,
                    id: 'pointer1',
                    index: 0, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000'
                },
                {
                    pointerRadii: [50, 50],
                    percent: 75,
                    id: 'pointer2',
                    index: 1, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000'
                },
                {
                    pointerRadii: [50, 50],
                    percent: 50,
                    id: 'pointer3',
                    index: 2, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000'
                },
            ];

            const result = getMinMaxPointer(pointers);

            expect(result).toEqual([
                {
                    pointerRadii: [50, 50],
                    percent: 25,
                    id: 'pointer1',
                    index: 0, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000'
                },
                {
                    pointerRadii: [50, 50],
                    percent: 75,
                    id: 'pointer2',
                    index: 1, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000'
                },
            ]);
        });

        it('returns correct min and max pointers when percent values are equal', () => {
            const pointers: IStatePointer[] = [
                {
                    pointerRadii: [50, 50],
                    percent: 50,
                    id: 'pointer1',
                    index: 0,
                    disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000'
                },
                {
                    pointerRadii: [50, 50],
                    percent: 50,
                    id: 'pointer2',
                    index: 1,
                    disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000'
                },
            ];

            const result = getMinMaxPointer(pointers);

            expect(result).toStrictEqual([
                {
                    pointerRadii: [50, 50],
                    percent: 50,
                    id: 'pointer1',
                    index: 0, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000'
                },
                {
                    pointerRadii: [50, 50],
                    percent: 50,
                    id: 'pointer1',
                    index: 0, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000'
                },
            ]);
        });
    });
});