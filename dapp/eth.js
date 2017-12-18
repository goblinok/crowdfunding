var constant = require('./constant.js');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

const mainAddress = constant.mainAddress;
const makerAddress = constant.makerAddress;
const eoaAddress = constant.eoaAddress;
const TokenContractAddress = constant.TokenContractAddress;
const crowdFundContractAddress = constant.crowdFundContractAddress;

// walletCompatibleToken Contract 
var walletTokenAbi = [
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
];
var TokenContract = web3.eth.contract(walletTokenAbi).at(TokenContractAddress);

// crowdFund Contract
var crowdFundAbi = [
    {
        "constant": true,
        "inputs": [],
        "name": "tokenReward",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "price",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "addressOfTokenUsedAsReward",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "backer",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "isContribution",
                "type": "bool"
            }
        ],
        "name": "FundTransfer",
        "type": "event"
    }
];
var CrowdFundContract = web3.eth.contract(crowdFundAbi).at(crowdFundContractAddress);

web3.eth.defaultAccount = web3.eth.accounts[0];

//------------------------
// TokenContract API
//------------------------
exports.getTokenAmount = function (address) {
   return TokenContract.balanceOf(address);
};

////------------------------
// CrowdFundContract API
//--------------------------
exports.getFundAmount = function (address) {
   return CrowdFundContract.balanceOf(address);
};

exports.getBalance = function (address) {
    return web3.fromWei(web3.eth.getBalance(address), 'ether');
};

exports.unlockAccount = function (from, passphase, callback) {
    web3.personal.unlockAccount(from, passphase, function (err, hash) {
        if (err) {
            console.log(err);
            return callback(err, '');
        } else {
            console.log("* unlock : " + from + ', ' + passphase );
            return callback(null, hash);
        }
    });
};

exports.sendTransaction = function(from, to, value, callback) {
    web3.eth.sendTransaction({
        to: to,
        from: from,
        value: web3.toWei(value,'ether'),
        gas: 100000}, function (err, hash) {
        if (err) {
            console.log(err);
            return callback(err, '');
        } else {
            console.log("* sendTransaction txhash : " + hash );
            return callback(null, hash);
        }
    });
};

exports.fundTransferEvent = function( callback ) {
    CrowdFundContract.FundTransfer().watch(function(error, res){
        if (error)
        {
            console.log(error);
            return callback(err, '');
        } else
        {
            console.log(res);
            return callback(null, res);
        }
    });
};






