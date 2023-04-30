Mocha Sample test
------

This folder contains a file named "Intro.test" which demonstrates a sample test written in Mocha test framework for a JavaScript class named "Car".

### Libraries used

The test script requires the "assert" library, which is included in Node.js by default, and the "mocha" test framework which can be installed using npm.

### Class Details

The "Car" class has two methods:

-   `park()`: Returns the string "stopped".
-   `drive()`: Returns the string "vroom".

### Test Details

The test script defines a "beforeEach" function which is executed before each test case. It creates a new instance of the "Car" class and assigns it to the "car" variable.

The test script contains two test cases:

-   `it("can park")`: Tests the "park" method of the "Car" class. It checks whether calling the "park" method on the "car" instance returns the string "stopped".
-   `it("can drive")`: Tests the "drive" method of the "Car" class. It creates a new instance of the "Car" class, calls the "drive" method on it and checks whether it returns the string "vroom".

### Running the tests

To run the tests, open the terminal and navigate to this folder. Then, run the command "npm test". This will execute the test script using Mocha test framework and display the results in the terminal.

### Disclaimer

This code is for educational purposes only and should not be used in a production environment without proper testing and verification. The author is not responsible for any damages or losses caused by the use of this code.
