// Mixins are a way to reuse code in multiple class hierarchies.
// In TypeScript, a mixin is a function that accepts a class constructor,
// extends it with new properties and methods, and then returns the extended class// A mixin that adds a timestamp property to a class

type Constructor = new (...args: any[]) => {};
function TimeStamped<TBase extends Constructor>(Base: TBase) {
  return class TimeStamped extends Base {
    private _timestamp = Date.now();

    constructor(...args: any[]) {
      super(...args);
    }

    get timestamp() {
      console.log(`Created at ${this._timestamp}`);
      return this._timestamp;
    }
  };
}

// A base class
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export function testMixins() {
  // Extend the User class with the TimeStamped mixin
  const TimeStampedUser = TimeStamped(User);

  // Create a new instance
  const user = new TimeStampedUser("Alice");

  console.log(user.name); // Alice
  console.log(user.timestamp); // e.g., 1633024862251
}
