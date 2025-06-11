export class List {
    private value: any | undefined;
    private next: List | undefined;

    constructor(value: any | undefined) {
        this.value = value;
        this.next = undefined;
    }

    get rootValue(): any | undefined {
        return this.value;
    }

    static fromArray(array: Array<any>): List {
        // 0 -> List(undefined)
        // > 0 -> List(val, val2, ...)
        const list = new List(undefined);
        let current = list;
        // [1,2]
        for (let idx = 0; idx < array.length; idx++) {
            current.value = array[idx];
            const next = new List(undefined);
            current.next = next;
            // if we are at the last element, we do not need to create a next
            if (idx === array.length - 1) {
                break;
            }
            current = next;
        }
        return list;
    }

    toArray(): Array<any> {
        const array: Array<any> = [];
        let current: List | undefined = this;
        while (current) {
            array.push(current.value);
            if (current.next === undefined) {
                break;
            }
            current = current.next;
        }
        return array;
    }

    size(): number {
        let counter = 0;
        let current: List | undefined = this;
        while (current) {
            counter++;
            current = current.next;
        }
        return counter;
    }

    append(value: any): void {
        let current: List | undefined = this;
        while (current) {
            if (current.next === undefined) {
                break; // we reached the end
            }
            current = current.next;
        }
        current.next = new List(value);
    }

    prepend(value: any): void {
        const oldList = new List(this.value);
        oldList.next = this.next;
        this.value = value;
        this.next = oldList;
    }

    pop(): List {
        if (this.next === undefined && this.value === undefined) {
            throw new Error("You can not pop from an empty list");
        }
        let previous: List | undefined = undefined;
        let current: List | undefined = this;
        while (current.next !== undefined && current.next.value !== undefined) {
            previous = current;
            current = current.next;
        }
        if (previous === undefined) {
            // Only one element in the list
            const popped = new List(this.value);
            this.value = undefined;
            return popped;
        } else {
            previous.next = undefined;
            return current;
        }
    }

    popNth(target: number): List | undefined {
        let previous: List | undefined = undefined;
        let current: List = this;
        let counter = 0;

        // 1) target = 0
        // 2) 0 < target < size
        // 3) target = size

        while (counter < target && current.next !== undefined) {
            previous = current;
            current = current.next;
            counter++;
        }

        // target = 0
        if (previous === undefined) {
            // We are popping the root element
            const popped = new List(current.value);
            this.value = current.next?.value; // may be next element or undefined if there was only one element
            this.next = current.next?.next;
            return popped;
        }

        // 0 < target < size && target = size
        previous.next = current.next;
        const popped = new List(current.value);
        return popped;
    }

    private getNth(list: List, counter: number, target: number): List | undefined {
        if (counter === target) {
            return list;
        }
        if (list.next === undefined) {
            return undefined;
        } else {
            return this.getNth(list.next, ++counter, target);
        }
    }

    nth(target: number): List | undefined {
        return this.getNth(this, 0, target);
    }
}