import { flatten, loopEvery, someEvery } from './arrayFunctions';

describe('flatten', () => {
    it('flattens a shallow array of arrays', () => {
        expect(flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
    });
    it('flattens a mixed array of values and arrays', () => {
        expect(flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
    });
    it('returns an empty array for empty input', () => {
        expect(flatten([])).toEqual([]);
    });
    it('handles array of single values', () => {
        expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
    });
});

describe('loopEvery', () => {
    it('returns true if all elements match predicate', () => {
        expect(loopEvery([2, 4, 6], x => x % 2 === 0)).toBe(true);
    });
    it('returns false if any element does not match predicate', () => {
        expect(loopEvery([2, 3, 6], x => x % 2 === 0)).toBe(false);
    });
    it('returns true for empty array', () => {
        expect(loopEvery([], () => false)).toBe(true);
    });
});

describe('someEvery', () => {
    it('returns true if any element does not match predicate', () => {
        expect(someEvery([2, 3, 6], x => x % 2 === 0)).toBe(true);
    });
    it('returns false if all elements match predicate', () => {
        expect(someEvery([2, 4, 6], x => x % 2 === 0)).toBe(false);
    });
    it('returns false for empty array', () => {
        expect(someEvery([], () => false)).toBe(false);
    });
});
