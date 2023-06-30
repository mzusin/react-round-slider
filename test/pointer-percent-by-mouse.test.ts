import { Vector2 } from 'mz-math';
import { getPointerPercentByMouse } from '../src/core/domain/slider-provider';

describe('getPointerPercentByMouse()', () => {
    it('returns correct percent for mouse position inside the arc', () => {
        const $svg: any = {
            getBoundingClientRect: jest.fn(() => ({
                left: 0,
                top: 0,
            })),
        };
        const absoluteMouse: Vector2 = [100, 100];
        const center: Vector2 = [50, 50];
        const svgRadii: Vector2 = [50, 50];
        const startAngleDegrees = 0;
        const endAngleDegrees = 180;
        const min = 0;
        const max = 100;

        const result = getPointerPercentByMouse(
            $svg,
            absoluteMouse,
            center,
            svgRadii,
            startAngleDegrees,
            endAngleDegrees,
            min,
            max,
            undefined,
            undefined
        );

        expect(result).toBe(25);
    });

    it('returns correct percent for mouse position outside the arc', () => {
        const $svg: any = {
            getBoundingClientRect: jest.fn(() => ({
                left: 0,
                top: 0,
            })),
        };
        const absoluteMouse: Vector2 = [100, 100];
        const center: Vector2 = [50, 50];
        const svgRadii: Vector2 = [50, 50];
        const startAngleDegrees = 0;
        const endAngleDegrees = 180;
        const min = 0;
        const max = 100;

        const result = getPointerPercentByMouse(
            $svg,
            absoluteMouse,
            center,
            svgRadii,
            startAngleDegrees,
            endAngleDegrees,
            min,
            max,
            undefined,
            undefined
        );

        expect(result).toBe(25);
    });

    it('returns correct percent for mouse position with negative angles', () => {
        const $svg: any = {
            getBoundingClientRect: jest.fn(() => ({
                left: 0,
                top: 0,
            })),
        };
        const absoluteMouse: Vector2 = [100, 100];
        const center: Vector2 = [50, 50];
        const svgRadii: Vector2 = [50, 50];
        const startAngleDegrees = -90;
        const endAngleDegrees = 90;
        const min = 0;
        const max = 100;

        const result = getPointerPercentByMouse(
            $svg,
            absoluteMouse,
            center,
            svgRadii,
            startAngleDegrees,
            endAngleDegrees,
            min,
            max,
            undefined,
            undefined
        );

        expect(result).toBe(25);
    });

});