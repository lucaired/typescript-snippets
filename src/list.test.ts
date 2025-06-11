import { describe, it, expect } from '@jest/globals';
import { List } from './list';

describe('List', () => {
    it('should create a list with one undefined value element', () => {
        const list = new List(undefined);
        expect(list.size()).toBe(1);
        const arr = list.toArray();
        expect(arr).toEqual([undefined]);
    });

    it('should create a list from an empty array', () => {
        const list = List.fromArray([]);
        expect(list.size()).toBe(1);
    });

    it('should create a list from an array with five elements', () => {
        const list = List.fromArray([1, 2, 3, 4, 5]);
        expect(list.size()).toBe(6); // 5 elements + 1 undefined
        const arr = list.toArray();
        expect(arr).toEqual([1, 2, 3, 4, 5]);
    });

    it('should append an element to the list', () => {
        const list = new List(1);
        list.append(1);
        expect(list.size()).toBe(2); // 1 element + 1 undefined
        const arr = list.toArray();
        expect(arr).toEqual([1, 1]);
    });

    it('should append multiple elements to the list', () => {
        const list = new List(undefined);
        list.append(1);
        list.append(2);
        list.append(3);
        expect(list.size()).toBe(4); // 3 elements + 1 undefined
        const arr = list.toArray();
        expect(arr).toEqual([undefined, 1, 2, 3]);
    });

    it('should yiled root value of the first element', () => {
        const list = new List(1);
        expect(list.rootValue).toBe(1);
    });

    it('should pop the last element from the list', () => {
        const list = List.fromArray([1, 2]);
        const popped = list.pop();
        expect(popped.rootValue).toBe(2); // last element popped
        expect(list.size()).toBe(1); // 1 element
        const arr = list.toArray();
        expect(arr).toEqual([1]);
    });

    it('should throw an error when popping from an empty list', () => {
        const list = new List(undefined);
        expect(() => list.pop()).toThrow("You can not pop from an empty list");
    });

    it('should get the 3rd element from the list', () => {
        const list = List.fromArray([1, 2, 3, 4, 5]);
        const thirdElement = list.nth(3);
        expect(thirdElement?.rootValue).toBe(4); // 3rd element is 4
        expect(list.nth(6)).toBeUndefined(); // 6th element does not exist
    });

    it('should prepend an element to the list', () => {
        const list = new List(2);
        expect(list.size()).toBe(1); // 1 element
        expect(list.rootValue).toBe(2);
        list.prepend(1);
        const arr = list.toArray();
        expect(arr).toEqual([1, 2]);
    });

    it('should pop the 1st element from the list', () => {
        const list = List.fromArray([1, 2, 3, 4, 5]);
        const popped = list.popNth(0);
        expect(popped?.rootValue).toBe(1); // first element popped
        const arr = list.toArray();
        expect(arr).toEqual([2, 3, 4, 5]);
    });

    it('should pop the 3rd element from the list', () => {
        const list = List.fromArray([1, 2, 3, 4, 5]);
        const popped = list.popNth(2);
        expect(popped?.rootValue).toBe(3); // third element popped
        const arr = list.toArray();
        expect(arr).toEqual([1, 2, 4, 5]);
    });

    it('should pop the last element from the list', () => {
        const list = List.fromArray([1, 2, 3, 4, 5]);
        const popped = list.popNth(4);
        expect(popped?.rootValue).toBe(5); // last element popped
        const arr = list.toArray();
        expect(arr).toEqual([1, 2, 3, 4]);
    });
});