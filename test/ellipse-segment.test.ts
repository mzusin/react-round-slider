import { IEllipse } from '../src/core/interfaces';
import { Vector2 } from 'mz-math';
import { getEllipseSegment } from '../src/core/domain/slider-provider';

describe('Ellipse Segment', () => {
    test('returns correct ellipse segment for start angle 0 and end angle 90', () => {
        const startAngleDegrees = 0;
        const endAngleDegrees = 90;
        const svgRadii: Vector2 = [ 100, 100 ];
        const pointerRadii: Vector2 = [ 50, 50 ];
        const strokeWidth = 2;

        const result: IEllipse = getEllipseSegment(startAngleDegrees, endAngleDegrees, svgRadii, pointerRadii, strokeWidth);

        // Perform assertions on the result
        expect(result.start).toEqual( [250, 150] );
        expect(result.end).toEqual([150, 250]);
        expect(result.largeArcFlag).toBe(0);
    });

    test('returns correct ellipse segment for start angle 270 and end angle 90', () => {
        const startAngleDegrees = 270;
        const endAngleDegrees = 90;
        const svgRadii: Vector2 = [ 200, 150 ];
        const pointerRadii: Vector2 = [ 100, 75 ];
        const strokeWidth = 2;

        const result: IEllipse = getEllipseSegment(startAngleDegrees, endAngleDegrees, svgRadii, pointerRadii, strokeWidth);

        // Perform assertions on the result
        expect(result.start).toEqual([299.99999999999994, 75]);
        expect(result.end).toEqual([300.00000000000006, 375]);
        expect(result.largeArcFlag).toBe(0);
    });

    test('returns correct ellipse segment for start angle 0 and end angle 90', () => {
        const startAngleDegrees = 0;
        const endAngleDegrees = 90;
        const svgRadii: Vector2 = [100, 100];
        const pointerRadii: Vector2 = [50, 50];
        const strokeWidth = 2;

        const result: IEllipse = getEllipseSegment(startAngleDegrees, endAngleDegrees, svgRadii, pointerRadii, strokeWidth);

        // Perform assertions on the result
        expect(result.start).toEqual([250, 150]);
        expect(result.end).toEqual([150, 250]);
        expect(result.largeArcFlag).toBe(0);
    });

    test('returns correct ellipse segment for start angle 270 and end angle 90', () => {
        const startAngleDegrees = 270;
        const endAngleDegrees = 90;
        const svgRadii: Vector2 = [200, 150];
        const pointerRadii: Vector2 = [100, 75];
        const strokeWidth = 2;

        const result: IEllipse = getEllipseSegment(startAngleDegrees, endAngleDegrees, svgRadii, pointerRadii, strokeWidth);

        // Perform assertions on the result
        expect(result.start).toEqual([299.99999999999994, 75]);
        expect(result.end).toEqual([300.00000000000006, 375]);
        expect(result.largeArcFlag).toBe(0);
    });

    test('returns correct ellipse segment for start angle 45 and end angle 45', () => {
        const startAngleDegrees = 45;
        const endAngleDegrees = 45;
        const svgRadii: Vector2 = [50, 50];
        const pointerRadii: Vector2 = [25, 25];
        const strokeWidth = 2;

        const result: IEllipse = getEllipseSegment(startAngleDegrees, endAngleDegrees, svgRadii, pointerRadii, strokeWidth);

        // Perform assertions on the result
        expect(result.start).toEqual([110.35533905932738, 110.35533905932738]);
        expect(result.end).toEqual([110.35533905932738, 110.35533905932738]);
        expect(result.largeArcFlag).toBe(0);
    });

    test('returns correct ellipse segment for start angle 180 and end angle 540', () => {
        const startAngleDegrees = 180;
        const endAngleDegrees = 540;
        const svgRadii: Vector2 = [100, 75];
        const pointerRadii: Vector2 = [50, 37.5];
        const strokeWidth = 2;

        const result: IEllipse = getEllipseSegment(startAngleDegrees, endAngleDegrees, svgRadii, pointerRadii, strokeWidth);

        // Perform assertions on the result
        expect(result.start).toEqual([50, 112.50000000000001]);
        expect(result.end).toEqual([50, 112.50000000000003]);
        expect(result.largeArcFlag).toBe(1);
    });

});