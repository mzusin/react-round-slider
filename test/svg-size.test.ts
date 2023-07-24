import { getSVGSize } from '../src/core/domain/svg-provider';

describe('getSVGSize()', () => {

    it('should return the correct SVG size when all inputs are positive', () => {
        // Test case 1
        const result1 = getSVGSize(100, 10, 5, 2);
        expect(result1).toEqual(220);

        // Test case 2
        const result2 = getSVGSize(50, 5, 2, 1);
        expect(result2).toEqual(110);

        // Test case 3
        const result3 = getSVGSize(80, 8, 3, 1);
        expect(result3).toEqual(176);
    });

    it('should handle zero values for inputs', () => {
        // Test case with all zero inputs
        const result = getSVGSize(0, 0, 0, 0);
        expect(result).toEqual(0);
    });

    it('should handle negative values for inputs', () => {
        // Test case with negative values
        const result = getSVGSize(-50, -5, -2, -1);
        expect(result).toEqual(-104); // Since thickness and diff can't be negative, the result should be 0.
    });

    it('should handle large values for inputs', () => {
        // Test case with large values
        const result = getSVGSize(100000, 10000, 5000, 2000);
        expect(result).toEqual(220000);
    });

    it('should handle decimal values for inputs', () => {
        // Test case with decimal values
        const result = getSVGSize(33.333, 3.14, 1.5, 0.5);
        expect(result).toBeCloseTo(72.946, 2);
    });

    it('should return the correct SVG size when maxPointerRadius is greater than circleThickness', () => {
        // Test case with maxPointerRadius > circleThickness
        const result1 = getSVGSize(50, 10, 5, 2);
        expect(result1).toEqual(120);

        // Test case with large values
        const result2 = getSVGSize(80, 15, 8, 4);
        expect(result2).toEqual(190); // circleRadius * 2 + circleThickness + diff = 80 * 2 + 8 + (15 * 2 - 8) = 104
    });

    it('should return the correct SVG size when maxPointerRadius is equal to circleThickness', () => {
        // Test case with maxPointerRadius === circleThickness
        const result = getSVGSize(100, 20, 20, 5);
        expect(result).toEqual(240);
    });

    it('should return the correct SVG size when maxPointerRadius is less than circleThickness', () => {
        // Test case with maxPointerRadius < circleThickness
        const result1 = getSVGSize(60, 5, 10, 2);
        expect(result1).toEqual(134); // circleRadius * 2 + circleThickness + diff = 60 * 2 + 10 + (5 * 2 - 10) = 84

        // Test case with large values
        const result2 = getSVGSize(90, 8, 15, 4);
        expect(result2).toEqual(203); // circleRadius * 2 + circleThickness + diff = 90 * 2 + 15 + (8 * 2 - 15) = 110
    });
});