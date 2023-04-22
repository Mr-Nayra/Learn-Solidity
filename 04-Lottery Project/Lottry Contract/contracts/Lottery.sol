//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

//Version of solidity that our code is written with

contract Lottery {
    address public manager;
    address payable[] public players;

    constructor() {
        manager = msg.sender;
        // msg.sender gives the address of the person declaring the contract
    }

    function enter() public payable {
        require(msg.value > 0.01 ether);
        //validates boolean condition,
        //and continues executing the function when condition is true
        //else stops the execution

        players.push(payable(msg.sender));
    }

    function pickWinner() public restricted {
        uint256 index = getRandomNumber() % players.length;
        players[index].transfer(address(this).balance);
        // this.balance gives all the ether present in the current instance of the contract

        players = new address payable[](0);
    }

    modifier restricted() {
        //defines a new function modifier to be added to our contract
        //helps in keeping code DRY
        require(msg.sender == manager);
        _;
        //all the code present in the function which uses restricted as a modifier
        //will replace '_;' after all the code present above '_;'
    }

    function getRandomNumber() private view returns (uint256) {
        //since solidity does not have a random number generator function
        //we have to create a pseudo random generator ourselves

        return
            uint256(
                keccak256(
                    abi.encodePacked(block.prevrandao, block.timestamp, players)
                )
            );
        //we are passing curent block difficulty, current time and
        //the array of players to generate a random number
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
}
