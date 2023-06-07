import { handlePointerZIndex } from '../src/core/domain/slider-provider';
import { IStatePointer } from '../src/core/interfaces';

describe('handlePointerZIndex()', () => {

    test('returns unmodified pointers array when activePointerId is null', () => {
        const activePointerId: string | null = null;
        const pointers: IStatePointer[] = [
            { pointerRadii: [10, 10], percent: 50, id: '1', index: 0 },
            { pointerRadii: [10, 10], percent: 75, id: '2', index: 1 },
        ];

        const result = handlePointerZIndex(activePointerId, pointers);

        expect(result).toEqual(pointers);
    });

    test('returns unmodified pointers array when pointers length is less than or equal to 1', () => {
        const activePointerId: string | null = '1';
        const pointers: IStatePointer[] = [{ pointerRadii: [10, 10], percent: 50, id: '1', index: 0 }];

        const result = handlePointerZIndex(activePointerId, pointers);

        expect(result).toEqual(pointers);
    });

    test('returns modified pointers array with active pointer moved to the end', () => {
        const activePointerId: string | null = '2';
        const pointers: IStatePointer[] = [
            { pointerRadii: [10, 10], percent: 50, id: '1', index: 0 },
            { pointerRadii: [10, 10], percent: 75, id: '2', index: 1 },
        ];

        const result = handlePointerZIndex(activePointerId, pointers);

        expect(result).toEqual([
            { pointerRadii: [10, 10], percent: 50, id: '1', index: 0 },
            { pointerRadii: [10, 10], percent: 75, id: '2', index: 1 },
        ]);
    });

    test('returns modified pointers array with active pointer moved to the end (multiple pointers)', () => {
        const activePointerId: string | null = '3';
        const pointers: IStatePointer[] = [
            { pointerRadii: [10, 10], percent: 50, id: '1', index: 0 },
            { pointerRadii: [10, 10], percent: 75, id: '2', index: 1 },
            { pointerRadii: [10, 10], percent: 80, id: '3', index: 2 },
            { pointerRadii: [10, 10], percent: 60, id: '4', index: 3 },
        ];

        const result = handlePointerZIndex(activePointerId, pointers);

        expect(result).toEqual([
            { pointerRadii: [10, 10], percent: 50, id: '1', index: 0 },
            { pointerRadii: [10, 10], percent: 75, id: '2', index: 1 },
            { pointerRadii: [10, 10], percent: 60, id: '4', index: 3 },
            { pointerRadii: [10, 10], percent: 80, id: '3', index: 2 },
        ]);
    });
});