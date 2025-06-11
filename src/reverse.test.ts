import { reverse, reverseInPlace } from "./reverse";

describe('reverse', () => {
    it('should return reversed array', () => {
        const array = [1, 2, 3, 4, 5];
        expect(reverse(array)).toMatchObject([5, 4, 3, 2, 1]);
    });
    it('should return reversed array with undefined', () => {
        const array = [0, undefined, 1, 2, 3, 4, 5];
        expect(reverse(array)).toMatchObject([5, 4, 3, 2, 1, undefined, 0]);
    });
});

describe('reverseInPlace', () => {
    it('should return reversed array on empty', () => {
        expect(reverseInPlace([])).toMatchObject([]);
    });
    it('should return reversed array', () => {
        const array = [1, 2, 3, 4, 5];
        expect(reverseInPlace(array)).toMatchObject([5, 4, 3, 2, 1]);
    });
    it('should return reversed array with undefined', () => {
        const array = [0, undefined, 1, 2, 3, 4, 5];
        expect(reverse(array)).toMatchObject([5, 4, 3, 2, 1, undefined, 0]);
    });
    it('should return reversed array with object', () => {
        const testObj = { a: 5 };
        const array = [0, undefined, 1, 2, 3, 4, 5, testObj];
        expect(reverse(array)).toMatchObject([testObj, 5, 4, 3, 2, 1, undefined, 0]);
    });
});