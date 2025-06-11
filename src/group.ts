export class Group<T> {
    private elements: Array<T>;

    // iterator
    private nextValue: T | undefined;
    private rest: Array<T>;

    constructor() {
        this.elements = [];
        this.nextValue = undefined;
        this.rest = [];
    }

    has(element: T): boolean {
        for (const elem of this.elements) {
            if (elem === element) {
                return true;
            }
        }
        return false;
    }

    add(element: T) {
        if (!this.has(element)) {
            this.elements.push(element);
        }
        this.nextValue = undefined;
        this.rest = this.elements;
    }

    del(element: T) {
        this.elements = this.elements.reduce((acc, curr) => {
            if (element === curr) {
                return acc;
            } else {
                return [...acc, curr];
            }
        }, [] as Array<T>);
        this.nextValue = undefined;
        this.rest = this.elements;
    }

    next(): { value: T | undefined, done: boolean } {
        // empty rest means that nothing is left or that the elements list is empty
        if (this.rest.length === 0) {
            return { value: undefined, done: true };
        }
        // this.rest = [1,2] | [1]
        const [nextValue, ...rest] = this.rest;
        this.rest = rest;
        return { value: nextValue, done: false };
    }

    /**
     * Makes the Group class iterable using for...of, spread syntax, etc.
     * This method is part of the ES6 iterable protocol.
     *
     * @returns {Iterator<T>} An iterator object that yields each element in the group.
     *
     * Example usage:
     *   const group = new Group<number>();
     *   group.add(1); group.add(2);
     *   for (const value of group) { ... }
     *
     * The returned iterator is independent of the Group's internal state and
     * iterates over a snapshot (copy) of the elements at the time of iteration.
     */
    [Symbol.iterator](): Iterator<T> {
        let index = 0;
        const elements = this.elements.slice(); // copy to avoid mutation during iteration
        return {
            /**
             * Returns the next value in the iteration sequence.
             * @returns {IteratorResult<T>} An object with 'value' and 'done' properties.
             */
            next(): IteratorResult<T> {
                if (index < elements.length) {
                    return { value: elements[index++], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
}