const assert = require("assert");
//it is used to make assertions about test
const ganache = require("ganache-cli");
const Web3 = require("web3");
//'W' is capital as this is a constructor function used to create instances of web3
const web3 = new Web3(ganache.provider());
const { abi, evm } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  //Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(abi) //creates an instance of contract. Teaches web3 about what method an Inbox contract has
    //contract is a Constructor which helps us to interact with an existing contract on blockchain or to create and deploy new contract
    .deploy({
      data: evm.bytecode.object,
      arguments: ["Hi there!"], // maps to parameters in methods of a contract
    }) //Tells web3 that we want to deploy a new copy of thin contract
    .send({ from: accounts[0], gas: "1000000" }); //Instructs web3 to send out a transaction that creates this contract
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
    //tests the before each logic and tests whether the contract is being deployed
    //presence of an address tells that a contract is being succefully deployed on local ganache network
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    //message parenthesis is used to pass the arguments that might be required
    //call parenthesis is used to customize the type of transaction we are trying to send
    assert.equal(message, "Hi there!");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("bye").send({ from: accounts[0] });
    // account is added in send as to tell who will be paying for this transaction

    const message = await inbox.methods.message().call();
    assert.equal(message, "bye");
  });
});
