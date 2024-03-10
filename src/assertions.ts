// An assertion is a statement in a programming language that enables you to test your assumptions about your program.
// Each assertion contains a boolean expression that you believe will be true when the assertion executes.
// If it is not true, the system will throw an error.

// as const
// The as const assertion is a signal to TypeScript that a variable
// is a constant value and that no properties of the value will change.
// This allows you to work with objects in a more natural way.
const colors = { red: "red", blue: "blue" } as const;

// as type or <type>
// The as type assertion is a way to tell TypeScript that you know
// more about the type of a value than it does.
// Overrides the static type-checker
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");
const withOutType = document.getElementById("main_canvas"); // type is HtmlElement | null

// You can suppress the type-checker by using the any type
// This is not recommended, as it defeats the purpose of using TypeScript
const myCanvas3 = document.getElementById("main_canvas") as any;

// Non-null assertion operator
// The ! non-null assertion operator is used to tell TypeScript that
// an expression is not null or undefined
const myCanvas4 = document.getElementById("main_canvas")!;

// --------------------------------------------------------------------------------------------

// satisfies keyword - Developers want to ensure some expression satisfies a type,
// but do not want to cast the expression to that type.

// Each property can be a string or an RGB tuple.
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255],
  //  ^^^^ sacrebleu - we've made a typo!
};

// We want to be able to use array methods on 'red'...
const redComponent = palette.red.at(0);

// or string methods on 'green'...
const greenNormalized = palette.green.toUpperCase();

type Colors = "red" | "green" | "blue";
type RGB = [red: number, green: number, blue: number];

const palette2: Record<Colors, string | RGB> = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255],
  //  ~~~~ The typo is now correctly detected
};
// But we now have an undesirable error here - 'palette.red' "could" be a string.
const redComponent2 = palette2.red.at(0); // string | number | undefined

const palette3 = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255],
  //  ~~~~ The typo is now caught!
} satisfies Record<Colors, string | RGB>;

// Both of these methods are still accessible!
const redComponent3 = palette.red.at(0); // number | undefined
const greenNormalized3 = palette.green.toUpperCase();
