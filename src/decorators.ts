// Set experimentalDecorators to true in tsconfig.json

// Decorator factory

// class decorators
function sealed(constructor: Function) {
  Object.seal(constructor); // Prevents adding properties to existing constructor
  Object.seal(constructor.prototype); // Prevents adding properties to existing constructor prototype
}

function logger<TFunction extends Function>(target: TFunction): TFunction {
  const newConstructor: Function = function () {
    console.log("Creating new instance");
    console.log(target);
  };
  newConstructor.prototype = Object.create(target.prototype);
  newConstructor.prototype.constructor = target;
  return <TFunction>newConstructor;
}

function first() {
  console.log("first(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("first(): called");
  };
}

function second() {
  console.log("second(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("second(): called");
  };
}

@logger
class ExampleClass {
  @first()
  @second()
  @timeIt()
  method() {}
}

// Method decorators
// observe, measure, modify, replace, or add a method definition
function timeIt() {
  return function (
    target: any, // prototype of the class
    propertyKey: string, // name of the method
    descriptor: PropertyDescriptor // PropertyDescriptor is a built-in TypeScript interface
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const start = performance.now();
      const result = originalMethod.apply(this, args);
      const finish = performance.now();
      console.log(
        `Method: ${propertyKey} finished in ${finish - start} milliseconds`
      );
      return result;
    };
    return descriptor;
  };
}

// Accessor decorators
class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
  @prettyPrint()
  get x() {
    return this._x;
  }
  @prettyPrint()
  get y() {
    return this._y;
  }
}

function prettyPrint() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    if (descriptor.get) {
      const originalMethod = descriptor.get;
      descriptor.get = function () {
        const result = originalMethod.apply(this);
        return `${propertyKey}-axis: ${result}`;
      };
      return descriptor;
    } else {
      throw new Error(
        "Accessor decorator can only be applied to a get accessor"
      );
    }
  };
}

// Property decorators and Parameter decorators can be used in a similar way
export function testDecorators() {
  const exampleClass = new ExampleClass();
  exampleClass.method();
  const point = new Point(1, 2);
  console.log(point.x);
  console.log(point.y);
}
