// Both classes are equivalent
class Example {
  public prop1: string; // public by default
  private prop2: number; // only accessible within the class
  protected prop3: boolean; // accessible within the class and its subclasses

  constructor(prop1: string, prop2: number, prop3: boolean) {
    this.prop1 = prop1;
    this.prop2 = prop2;
    this.prop3 = prop3;
  }
}

class Example1 extends Example {
  constructor(prop1: string, prop2: number, prop3: boolean) {
    super(prop1, prop2, prop3);
  }

  public getProp3() {
    return this.prop3; // works because prop3 is protected
  }

  public getProp2() {
    return this.prop2; // does not work because prop2 is private
  }
}

class Example2 {
  constructor(
    public prop1: string,
    private prop2: number,
    protected prop3: boolean
  ) {}
}

// Constructor overloading

class Example3 {
  constructor();
  constructor(prop1: string);
  constructor(prop1: string, prop2: number);
  constructor(prop1: string, prop2: number, prop3: boolean);
  constructor(prop1?: string, prop2?: number, prop3?: boolean) {}
}

const a = new Example3();
const b = new Example3("hello");
const c = new Example3("hello", 42);
const d = new Example3("hello", 42, true);

class Point {
  constructor(public x: number, public y: number) {}
}

class NDPoint {
  private values: number[];

  constructor(point: Point);
  constructor(x: number);
  constructor(x: number, y: number);
  constructor(xOrPoint: number | Point, y?: number) {
    if (typeof xOrPoint === "number" && y !== undefined) {
      this.values = [xOrPoint, y];
    } else if (typeof xOrPoint !== "number" && y === undefined) {
      this.values = [xOrPoint.x, xOrPoint.y];
    } else {
      this.values = [];
    }
  }

  get x() {
    return this.values[0];
  }

  get y() {
    return this.values[1];
  }
}
