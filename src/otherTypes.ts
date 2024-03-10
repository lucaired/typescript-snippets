// The unknown type is a type-safe counterpart of any.
// It is a type that represents any value, but it is not type-safe.
// This means that you cannot perform any operations on an unknown value
// without first asserting or narrowing it to a more specific type.

let userInput: unknown;
userInput.toString(); // Error: Object is of type 'unknown'

let userInput2: any;
userInput2.toString(); // No error

// The never type represents the type of values that never occur.
// For example, never is the return type for a function expression or
// an arrow function expression that always throws an exception or one that never returns.

function throwError(message: string): never {
  throw new Error(message);
}
