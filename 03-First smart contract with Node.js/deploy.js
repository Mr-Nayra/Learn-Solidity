// const HDWalletProvider = require("@truffle/hdwallet-provider");
// //help us to connect to some outside api or some outside node
// const Web3 = require("web3");
// const { abi, evm } = require("./compile");

// const provider = new HDWalletProvider(
//   "current buzz spin absurd fresh text lady puzzle void oppose hurdle nose",
//   "https://sepolia.infura.io/v3/6cf9dbdef7494abc98730dc8243874ea"
// );
// //account mnemonic and sepolia project link from infura

// const web3 = new Web3(provider);

// const deploy = async () => {
//   const accounts = await web3.eth.getAccounts();

//   console.log(
//     "account with which the contract is being deployed " + accounts[0]
//   );

//   const result = await new web3.eth.Contract(abi)
//     .deploy({
//       data: evm.bytecode.object,
//       arguments: ["Hi there!"],
//     })
//     .send({ gas: "1000000", from: accounts[0] });

//   console.log(
//     "Address at which contract is deployed " + result.options.address
//   );

//   provider.engine.stop();
// };

// deploy();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const { abi, evm } = require("./compile");

provider = new HDWalletProvider(
  "current buzz spin absurd fresh text lady puzzle void oppose hurdle nose",
  "https://sepolia.infura.io/v3/6cf9dbdef7494abc98730dc8243874ea"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ["Hi there!"] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
