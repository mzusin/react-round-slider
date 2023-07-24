import { getSVGCenter } from '../src/core/domain/svg-provider';

describe('getSVGCenter()', () => {

    it('should return the correct center point for SVG', () => {
        // Test case 1
        const result1 = getSVGCenter(100, 10, 5, 2);
        expect(result1).toEqual([110, 110]);

        // Test case 2
        const result2 = getSVGCenter(50, 5, 2, 1);
        expect(result2).toEqual([55, 55]);

        // Test case 3
        const result3 = getSVGCenter(80, 8, 3, 1);
        expect(result3).toEqual([88, 88]);
    });

    it('should handle zero values for inputs', () => {
        // Test case with all zero inputs
        const result = getSVGCenter(0, 0, 0, 0);
        expect(result).toEqual([0, 0]);
    });

    it('should handle negative values for inputs', () => {
        // Test case with negative values
        const result = getSVGCenter(-50, -5, -2, -1);
        expect(result).toEqual([-52, -52]);
    });

    it('should return the correct center point for SVG', () => {
        // Test case 1
        const result1 = getSVGCenter(100, 10, 5, 2);
        expect(result1).toEqual([110, 110]);

        // Test case 2
        const result2 = getSVGCenter(50, 5, 2, 1);
        expect(result2).toEqual([55, 55]);

        // Test case 3
        const result3 = getSVGCenter(80, 8, 3, 1);
        expect(result3).toEqual([88, 88]);
    });

    it('should handle zero values for inputs', () => {
        // Test case with all zero inputs
        const result = getSVGCenter(0, 0, 0, 0);
        expect(result).toEqual([0, 0]);
    });

    it('should handle negative values for inputs', () => {
        // Test case with negative values
        const result = getSVGCenter(-50, -5, -2, -1);
        expect(result).toEqual([-52, -52]);
    });

    it('should handle large values for inputs', () => {
        // Test case with large values
        const result = getSVGCenter(100000, 10000, 5000, 2000);
        expect(result).toEqual([110000, 110000]);
    });

    it('should handle decimal values for inputs', () => {
        // Test case with decimal values
        const result = getSVGCenter(33.333, 3.14, 1.5, 0.5);
        expect(result).toEqual([36.47, 36.47]);
    });

    it('should return an array of two numbers', () => {
        // Test case with circleRadius = 20, maxPointerRadius = 3, circleThickness = 2, circleBorder = 1
        const result = getSVGCenter(20, 3, 2, 1);
        expect(result).toHaveLength(2);
        expect(typeof result[0]).toBe('number');
        expect(typeof result[1]).toBe('number');
    });
});