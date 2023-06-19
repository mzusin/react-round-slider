import { getNextPrevPointer } from '../src/core/domain/slider-provider';
import { IStatePointer } from '../src/core/interfaces';

describe('getNextPrevPointer()', () => {

    test('returns null when currentPointerId is not found in pointers array', () => {
        const currentPointerId = '3';
        const pointers: IStatePointer[] = [
            { pointerRadii: [10, 10], percent: 50, id: '1', index: 0, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
            { pointerRadii: [10, 10], percent: 75, id: '2', index: 1, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
        ];

        const result = getNextPrevPointer(pointers, currentPointerId);

        expect(result).toBe(null);
    });

    test('returns current, next, and previous pointers when currentPointerId is found', () => {
        const currentPointerId = '2';
        const pointers: IStatePointer[] = [
            { pointerRadii: [10, 10], percent: 50, id: '1', index: 0, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
            { pointerRadii: [10, 10], percent: 75, id: '2', index: 1, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
            { pointerRadii: [10, 10], percent: 80, id: '3', index: 2, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
        ];

        const result = getNextPrevPointer(pointers, currentPointerId);

        expect(result).toEqual([
            { pointerRadii: [10, 10], percent: 75, id: '2', index: 1, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
            { pointerRadii: [10, 10], percent: 80, id: '3', index: 2, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
            { pointerRadii: [10, 10], percent: 50, id: '1', index: 0, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
        ]);
    });
});