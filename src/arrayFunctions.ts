export function flatten<T>(array: Array<T | Array<T>>): Array<T> {
    return array.reduce((acc: T[], curr: T[] | T) => {
        return acc.concat(curr);
    }, [] as T[]);
}

export function loopEvery<T>(array: Array<T>, predicate: (t: T) => boolean): boolean {
    for (const elem of array) {
        if (!predicate(elem)) {
            return false;
        }
    }
    return true;
}

export function someEvery<T>(array: Array<T>, predicate: (t: T) => boolean): boolean {
    return array.some((elem) => !predicate(elem));
}