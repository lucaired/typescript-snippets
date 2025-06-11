import { Group } from './group';

describe('Group', () => {
    it('should add elements and not allow duplicates', () => {
        const group = new Group<number>();
        group.add(1);
        group.add(2);
        group.add(1);
        expect(group.has(1)).toBe(true);
        expect(group.has(2)).toBe(true);
        expect(group.has(3)).toBe(false);
    });

    it('should delete elements', () => {
        const group = new Group<number>();
        group.add(1);
        group.add(2);
        group.del(1);
        expect(group.has(1)).toBe(false);
        expect(group.has(2)).toBe(true);
    });

    it('should iterate over elements using next()', () => {
        const group = new Group<number>();
        group.add(1);
        group.add(2);
        group.add(3);
        const values: number[] = [];
        let result = group.next();
        while (!result.done) {
            values.push(result.value!);
            result = group.next();
        }
        expect(values.sort()).toEqual([1, 2, 3]);
    });

    it('should return done=true if next() called on empty group', () => {
        const group = new Group<number>();
        const result = group.next();
        expect(result.done).toBe(true);
        expect(result.value).toBeUndefined();
    });

    it('should reset iteration after add or del', () => {
        const group = new Group<number>();
        group.add(1);
        group.add(2);
        group.next(); // consume one
        group.add(3); // should reset iteration
        const values: number[] = [];
        let result = group.next();
        while (!result.done) {
            values.push(result.value!);
            result = group.next();
        }
        expect(values.sort()).toEqual([1, 2, 3]);
    });

    it('should iterate using Symbol.iterator', () => {
        const group = new Group<number>();
        group.add(1);
        group.add(2);
        group.add(3);
        const values: number[] = [];
        for (const value of group) {
            values.push(value);
        }
        expect(values.sort()).toEqual([1, 2, 3]);
    });
});
