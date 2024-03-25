import { flattenNode, flattenList } from './recursiveTypes';

describe('flattenNode', () => {
    it('should return the same node if value is not an array', () => {
        const node = { value: 5, next: null };
        expect(flattenNode(node)).toEqual(node);
    });

    it('should flatten the node if value is an array', () => {
        const node = { value: [1, 2, 3], next: null };
        const expected = { value: 1, next: { value: 2, next: { value: 3, next: null } } };
        expect(flattenNode(node)).toEqual(expected);
    });

    it('should return null if value is an empty array', () => {
        const node = { value: [], next: null };
        expect(flattenNode(node)).toBeNull();
    });
});

describe('flattenList', () => {
    it('should return null for an empty list', () => {
        expect(flattenList(null)).toBeNull();
    });

    it('should return the same list if no values are arrays', () => {
        const list = { value: 1, next: { value: 2, next: { value: 3, next: null } } };
        expect(flattenList(list)).toEqual(list);
    });

    it('should flatten the list if some values are arrays', () => {
        const list = { value: 1, next: { value: [2, 3], next: { value: 4, next: null } } };
        const expected = { value: 1, next: { value: 2, next: { value: 3, next: { value: 4, next: null } } } };
        expect(flattenList(list)).toEqual(expected);
    });

    it('should flatten the list if last values are arrays', () => {
        const list = { value: 1, next: { value: [2, 3, 4], next: null } };
        const expected = { value: 1, next: { value: 2, next: { value: 3, next: { value: 4, next: null } } } };
        expect(flattenList(list)).toEqual(expected);
    });
});