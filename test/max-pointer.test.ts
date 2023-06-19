import { getMaxPointer } from '../src/core/domain/slider-provider';
import { Vector2 } from 'mz-math';
import { IStatePointer } from '../src/core/interfaces';

describe('Max Pointer', () => {

    it('returns the maximum values of rx and ry from the pointers array', () => {
        const pointers: IStatePointer[] = [
            { pointerRadii: [5, 10], percent: 0.5, id: '1', index: 0, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
            { pointerRadii: [7, 8], percent: 0.3, id: '2', index: 1, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
            { pointerRadii: [3, 6], percent: 0.7, id: '3', index: 2, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
        ];
        const result: Vector2 = getMaxPointer(pointers);
        expect(result).toEqual([7, 10]);
    });

    it('returns [0, 0] when the pointers array is empty', () => {
        const pointers: IStatePointer[] = [];
        const result: Vector2 = getMaxPointer(pointers);
        expect(result).toEqual([0, 0]);
    });

    it('returns [0, 0] when all rx and ry values are negative', () => {
        const pointers: IStatePointer[] = [
            { pointerRadii: [-5, -10], percent: 0.2, id: '1', index: 0, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
            { pointerRadii: [-7, -8], percent: 0.4, id: '2', index: 1, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
            { pointerRadii: [-3, -6], percent: 0.6, id: '3', index: 2, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
        ];
        const result: Vector2 = getMaxPointer(pointers);
        expect(result).toEqual([0, 0]);
    });

    it('returns the maximum values when rx and ry are 0', () => {
        const pointers: IStatePointer[] = [
            { pointerRadii: [0, 0], percent: 0.2, id: '1', index: 0, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
            { pointerRadii: [2, 4], percent: 0.4, id: '2', index: 1, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
            { pointerRadii: [0, 6], percent: 0.6, id: '3', index: 2, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
        ];
        const result: Vector2 = getMaxPointer(pointers);
        expect(result).toEqual([2, 6]);
    });

    it('returns the maximum values when some rx or ry values are negative', () => {
        const pointers: IStatePointer[] = [
            { pointerRadii: [5, 10], percent: 0.5, id: '1', index: 0, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
            { pointerRadii: [-7, 8], percent: 0.3, id: '2', index: 1, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
            { pointerRadii: [3, -6], percent: 0.7, id: '3', index: 2, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
        ];
        const result: Vector2 = getMaxPointer(pointers);
        expect(result).toEqual([5, 10]);
    });

    it('returns the maximum values when the pointers array has a single element', () => {
        const pointers: IStatePointer[] = [
            { pointerRadii: [5, 10], percent: 0.5, id: '1', index: 0, disabled: false, keyboardDisabled: false, mousewheelDisabled: false, bgColor: '#000' },
        ];
        const result: Vector2 = getMaxPointer(pointers);
        expect(result).toEqual([5, 10]);
    });
});