const assert = require("assert");

class Car {
  park() {
    return "stopped";
  }

  drive() {
    return "vroom";
  }
}

// describe("Car", () => {
//   it("can park", () => {
//     const car = new Car();
//     assert.equal(car.park(), "stopped");
//   });
// });

let car;

beforeEach(() => {
  // const car = new Car(); cannot use this beacuse of scope of const
  car = new Car();
});

describe("Car", () => {
  it("can park", () => {
    assert.equal(car.park(), "stopped");
  });

  it("can drive", () => {
    const car = new Car();
    assert.equal(car.drive(), "vroom");
  });
});
