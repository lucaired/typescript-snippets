/**
 * In TypeScript, we can use multiple was to create types from other types:
 * 1) Type Aliases
 * 2) Generics - types that take parameters
 * 3) Keyof - a type that represents all the keys of another type
 * 4) Mapped Types - a type that takes another type and creates a new type from it
 * 5) Typeof - Using the typeof operator to create new types
 * 6) Indexed Access Types - Using Type['a'] syntax to access a subset of a type
 * 7) Conditional Types - Types which act like if statements in the type system
 * 8) Template Literal Types - Mapped types which change properties via template literal strings
 */

// Type Aliases
function identity<T>(arg: T): T {
  return arg;
}
let output = identity<string>("myString");
const output2 = identity("myString"); // TypeScript infers the type from the value
// is const output2 a symbol or a string?
// It's a string because TypeScript infers the type from the value

class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;

  // Generic constructor
  constructor(zeroValue: NumType, add: (x: NumType, y: NumType) => NumType) {
    this.zeroValue = zeroValue;
    this.add = add;
  }
}

const myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y);
const myGenericVector = new GenericNumber<{ x: number; y: number; z: number }>(
  { x: 0, y: 0, z: 0 },
  (a, b) => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z })
);

// Generic constraints, sometimes we want to limit the types that can be passed to a generic function
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// TypeParameters in Generic Constraints
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

// We can use this to build factories

class GermanCitizen {
  private nationality = "German";
  federalState: string;

  constructor(geoLocation: string) {
    this.federalState = geoLocation;
  }

  public get address(): string {
    return "Germany" + ", " + this.federalState;
  }
}
