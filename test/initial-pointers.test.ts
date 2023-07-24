import { initPointers } from '../src/core/domain/pointers-provider';
import { ISettings } from '../src/core/domain/settings-provider';
import { IData } from '../types/core/domain/data-provider';

describe('Initial Pointers', () => {

    const data: IData = {
        min: 0,
        max: 100,
        stepAngleDeg: 0,
        arrowStepAngleDeg: 360,
        round: 0,
        data: [],
        isClosedShape: true
    };

    it('should return an array of IPointer objects', () => {
        const settings: ISettings = {
            pointers: [
                { radius: 1, value: 10 },
                { radius: 2, value: 20 },
                { radius: 3, value: 30 },
            ]
        };

        const result = initPointers(settings, data);

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(settings.pointers.length);
        expect(result[0]).toHaveProperty('id');
        expect(result[0]).toHaveProperty('index');
    });

    it('should filter out invalid pointers', () => {
        const settings: ISettings = {
            pointers: [
                { radius: -1, value: 10 },
                { radius: 2, value: 20 },
            ]
        };

        const result = initPointers(settings, null);
        expect(result.length).toBe(1);
    });

    it('should set index property correctly', () => {
        const settings: ISettings = {
            pointers: [
                { radius: 2, value: 20 },
                { radius: 1, value: 10 },
                { radius: 3, value: 30 },
            ]
        };

        const result = initPointers(settings, null);

        for (let i = 0; i < result.length; i++) {
            expect(result[i].index).toBe(i);
        }
    });

    it('should return an empty array if no valid pointers exist', () => {
        const settings: ISettings = {
            pointers: [
                { radius: -1, value: 10 },
                { radius: 2, value: 20 },
            ]
        };

        const result = initPointers(settings, null);

        expect(result.length).toBe(1);
        expect(result[0].id).toBeDefined();
        expect(result[0].index).toBe(0);
        expect(result[0].angleDeg).toBe(0);
        expect(result[0].radius).toStrictEqual(10);
    });

});