// Write me all the utility types you can think of
interface User {
    name: string;
    age: number;
    email: string;
}
type PartialUser = Partial<User>; // all properties are optional
type ReadonlyUser = Readonly<User>; // all properties are readonly
type PickUser = Pick<User, 'name' | 'age'>; // pick only the properties you want
type RecordUser = Record<'user', User>; // create a new object with the key and value you want

type UnionA = 'a' | 'b' | 'c';
type UnionB = 'c' | 'd' | 'e';
type ExcludeUnion = Exclude<UnionA, UnionB>; // exclude the common values, in this case 'c'
// from UnionA, yields 'a' | 'b'
type ExtractUnion = Extract<UnionA, UnionB>; // extract the common values, in this case 'c'
// from UnionA, yields 'c'

// The parameters type is a utility type that extracts the parameters of a function type
type ParametersType = Parameters<(a: number, b: string) => void>; // [number, string]
// It is useful when you want to create a function that takes a function and its parameters
// and returns a new function that takes the same parameters but returns a different type

function f(a: number, b: string): void {
    console.log(a, b);
}
type ParamsType = Parameters<typeof f>; // [number, string]
function g(fun: typeof f, ...args: ParamsType): [number, string] {
    fun.call(null, ...args);
    return args;
}
console.log(g(f, 1, 'a')); // 1, 'a'

const h = (): void => { console.log('h'); };
// g(h); // Error: Expected 2 arguments, but got 0

// The ReturnType type is a utility type that extracts the return type of a function type
type ReturnTypeType = ReturnType<(a: number, b: string) => void>; // void

