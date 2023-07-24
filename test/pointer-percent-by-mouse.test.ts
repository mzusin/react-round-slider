import { Vector2 } from 'mz-math';
import { getAngleByMouse } from '../src/core/domain/pointers-provider';

describe('getAngleByMouse()', () => {
    it('returns correct angle for mouse position inside the arc', () => {
        const $svg: any = {
            getBoundingClientRect: jest.fn(() => ({
                left: 0,
                top: 0,
            })),
        };
        const absoluteMouse: Vector2 = [100, 100];
        const center: Vector2 = [50, 50];
        const svgRadii: Vector2 = [50, 50];

        const result = getAngleByMouse(
            $svg,
            ...absoluteMouse,
            ...center,
            ...svgRadii,
        );

        expect(result).toBe(45);
    });
});