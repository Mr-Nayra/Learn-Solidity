//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
//Version of solidity that our code is written with

contract Inbox {
    //Defines a new contract (structure is same as classes)
    string public message;

    constructor(string memory initialMessage) {
        //constructor function
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
