import { IUserSettingsPointer } from '../src/core/interfaces';
import { getInitialPointers } from '../src/core/domain/slider-provider';

describe('Initial Pointers', () => {
    const userSettingsPointers: IUserSettingsPointer[] = [
        { rx: 1, ry: 2, value: 10 },
        { rx: 2, ry: 3, value: 20 },
        { rx: 3, ry: 4, value: 30 },
    ];

    const min = 0;
    const max = 100;

    it('should return an array of IStatePointer objects', () => {
        const result = getInitialPointers(userSettingsPointers, min, max);

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(userSettingsPointers.length);
        expect(result[0]).toHaveProperty('pointerRadii');
        expect(result[0]).toHaveProperty('percent');
        expect(result[0]).toHaveProperty('id');
        expect(result[0]).toHaveProperty('index');
    });

    it('should filter out invalid userSettingsPointers', () => {
        const invalidUserSettingsPointers: IUserSettingsPointer[] = [
            { rx: -1, ry: 2, value: 10 },
            { rx: 2, ry: 0, value: 20 },
        ];

        const result = getInitialPointers(invalidUserSettingsPointers, min, max);

        expect(result.length).toBe(0);
    });

    it('should sort pointers by percent', () => {
        const unsortedUserSettingsPointers: IUserSettingsPointer[] = [
            { rx: 2, ry: 3, value: 20 },
            { rx: 1, ry: 2, value: 10 },
            { rx: 3, ry: 4, value: 30 },
        ];

        const result = getInitialPointers(unsortedUserSettingsPointers, min, max);

        expect(result[0].percent).toBeLessThan(result[1].percent);
        expect(result[1].percent).toBeLessThan(result[2].percent);
    });

    it('should set index property correctly', () => {
        const result = getInitialPointers(userSettingsPointers, min, max);

        for (let i = 0; i < result.length; i++) {
            expect(result[i].index).toBe(i);
        }
    });

    it('should return an empty array if no valid pointers exist', () => {
        const invalidUserSettingsPointers: IUserSettingsPointer[] = [
            { rx: -1, ry: 2, value: 10 },
            { rx: 2, ry: 0, value: 20 },
        ];

        const result = getInitialPointers(invalidUserSettingsPointers, min, max);

        expect(result).toEqual([]);
    });

});