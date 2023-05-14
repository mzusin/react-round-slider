import { getValue } from '../src/core/domain/slider-provider';

describe('Values', () => {

    describe('getValue()', () => {

        test("getValue(0, 0, 10)", () => {
            expect(getValue(0, 0, 10)).toStrictEqual(0);
        });

        test("getValue(10, 0, 10)", () => {
            expect(getValue(10, 0, 10)).toStrictEqual(10);
        });

        test("getValue(5, 0, 10)", () => {
            expect(getValue(5, 0, 10)).toStrictEqual(5);
        });

        test("getValue(-1, 0, 10)", () => {
            expect(getValue(-1, 0, 10)).toStrictEqual(0);
        });

        test("getValue(100, 0, 10)", () => {
            expect(getValue(100, 0, 10)).toStrictEqual(10);
        });

        test("getValue(-20, -100, -10)", () => {
            expect(getValue(-20, -100, -10)).toStrictEqual(-20);
        });
    });

    describe('getValue() with data', () => {

        test("getValue('banana', 0, 10, ['apple', 'banana', 'cherry'])", () => {
            expect(getValue('banana', 0, 2, ['apple', 'banana', 'cherry'])).toStrictEqual(1);
        });

        test("getValue('aaa', 0, 10, ['apple', 'banana', 'cherry'])", () => {
            expect(getValue('aaa', 0, 2, ['apple', 'banana', 'cherry'])).toStrictEqual(0);
        });

        test("getValue('apple', 0, 10, ['apple', 'banana', 'cherry'])", () => {
            expect(getValue('apple', 0, 2, ['apple', 'banana', 'cherry'])).toStrictEqual(0);
        });

        test("getValue('cherry', 0, 10, ['apple', 'banana', 'cherry'])", () => {
            expect(getValue('cherry', 0, 2, ['apple', 'banana', 'cherry'])).toStrictEqual(2);
        });
    })
});