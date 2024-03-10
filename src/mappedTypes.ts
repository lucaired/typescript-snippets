// Mapped types are a powerful way of creating new types by iterating over keys of an existing type.

// Mapping modifiers
// `-` modifier removes the readonly modifier from a property.
// `+` modifier adds the readonly modifier to a property.
// `?` modifier makes a property optional.
// `readonly` modifier makes a property readonly.

// The keyof operator returns a union of all the keys of an object type.

// For example, if we have the following type:
type Point = {
  x: number;
  y: number;
  z: number;
};
type Dimension = keyof Point;
const dimension: Dimension = "x"; // OK
// const dimension2: Dimension = "a"; // Error: Type '"a"' is not assignable to type '"x" | "y" | "z"'

// We can use the keyof operator to create a new type that has all the keys of Point as optional properties:
type PartialPoint = { [K in keyof Point]?: Point[K] };

type StandardPoint =
  | { [K in Exclude<keyof Point, "z">]: Point[K] }
  | { [K in "z"]?: Point[K] };
const standardPoint: StandardPoint = { x: 1, y: 2 }; // OK
const standardPoint2: StandardPoint = { x: 1, y: 2, z: 3 }; // OK

standardPoint.x = 3; // OK
// To prevent this, we can use the readonly modifier

type ReadonlyPoint = { readonly [K in keyof Point]: Point[K] };
const readonlyPoint: ReadonlyPoint = { x: 1, y: 2, z: 3 };
// readonlyPoint.x = 3; // Error: Cannot assign to 'x' because it is a read-only property.

// If the z property should stay manipulable, we can use the - modifier to remove it from the mapped type:
type MutablePoint = { -readonly [K in "z"]: ReadonlyPoint[K] } & {
  [K in Exclude<keyof Point, "z">]: Point[K];
};
const mutablePoint: MutablePoint = { x: 1, y: 2, z: 3 };
mutablePoint.z = 4; // OK
// mutablePoint.x = 4; // Error: Cannot assign to 'x' because it is a read-only property.
