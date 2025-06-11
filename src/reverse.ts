// returns reversed array
export function reverse<T extends any>(array: Array<T | undefined>): Array<T | undefined> {
    // [1,2,3,4,5]
    const reversed: Array<T | undefined> = [];
    if (array.length === 0) {
        return reversed;
    }
    // [1,2,3] -> -2
    for (let i = 1; i <= array.length; i++) {
        reversed.push(array.at(-i)); // note that [-index does not work in JavaScript]
    }
    return reversed;
}

export function reverseInPlace<T extends any>(array: Array<T | undefined>): Array<T | undefined> {
    // [0,1,2,3,4]
    let start = 0;
    let end = array.length - 1;
    // start = 2
    while (start < end) {
        let head = array[start];
        let tail = array[end];
        array[start] = tail;
        array[end] = head;
        start++; // start = 2
        end--; // start = 2
    }
    return array;
}