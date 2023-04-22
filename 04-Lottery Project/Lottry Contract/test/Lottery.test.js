const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());
const { abi, evm } = require("../compile");

let accounts;
let lottery;

beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  //Use one of those accounts to deploy the contract
  lottery = await new web3.eth.Contract(abi) //creates an instance of contract. Teaches web3 about what method an Inbox contract has
    //contract is a Constructor which helps us to interact with an existing contract on blockchain or to create and deploy new contract
    .deploy({
      data: evm.bytecode.object,
    }) //Tells web3 that we want to deploy a new copy of thin contract
    .send({ from: accounts[0], gas: "1000000" }); //Instructs web3 to send out a transaction that creates this contract
});

describe("Lottery Contract", () => {
  it("deploys a contract", () => {
    assert.ok(lottery.options.address);
    //tests the before each logic and tests whether the contract is being deployed
    //presence of an address tells that a contract is being succefully deployed on local ganache network
  });

  it("allows one account to enter", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"), //converts ether to wei
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0],
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  });

  it("allows multiple accounts to enter", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"), //converts ether to wei
    });
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("0.02", "ether"), //converts ether to wei
    });
    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei("0.02", "ether"), //converts ether to wei
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0],
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length);
  });

  it("requires a minimum amount of ether to enter", async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 200, //200 wei
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("only manager can call pick winner", async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("sends money to the winner and resets the players array", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("2", "ether"),
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);

    await lottery.methods.pickWinner().send({ from: accounts[0] });

    const finalBalance = await web3.eth.getBalance(accounts[0]);

    const difference = finalBalance - initialBalance;

    assert(difference > web3.utils.toWei("1.8", "ether"));
  });
});
