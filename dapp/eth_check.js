var constant = require('./constant.js');
var eth = require('./eth.js');
var fs = require('fs');

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));


const mainAddress = constant.mainAddress;
const makerAddress = constant.makerAddress;
const eoaAddress = constant.eoaAddress;
const TokenContractAddress = constant.TokenContractAddress;
const crowdFundContractAddress = constant.crowdFundContractAddress;

// Logging
function logArrayElements(name, index, array) {
  var balance = web3.fromWei(web3.eth.getBalance(name));
  var token_amount =  eth.getTokenAmount(name) 
  console.log('[' + index + '] = '+name +', '+balance+' ETH, ' +token_amount+' TDs' );
}

exports.getAll = function (mode) {
    var arr = new Object();
    if(mode==2) {
        var index = 1;
        fs.readFileSync('data/users.txt').toString().split('\n').forEach(
           function (line) { 
               //console.log(line);
               if(line!='') 
               { 
                  arr[line] = eth.getFundAmount(line);
               }
           }
       );
   } else if(mode==1) {
        var addresses = [ mainAddress, makerAddress, eoaAddress, TokenContractAddress, crowdFundContractAddress];
        addresses.forEach(logArrayElements);
   }
   return arr;
};
