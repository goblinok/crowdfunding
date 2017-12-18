var constant = require('../dapp/constant.js');
var eth = require('../dapp/eth.js');
var eth_check = require('../dapp/eth_check.js');

var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/withdraw', function(req, res, next) {
    var mode = req.query.mode;
    var arr = eth_check.getAll(mode);
    res.render('new', {users:arr});
});

router.get('/', function(req, res, next) {
    var fund_balance = eth.getBalance(constant.crowdFundContractAddress);
    var fund_tamount = eth.getTokenAmount(constant.crowdFundContractAddress); // token balanceof

    var maker_balance = eth.getBalance(constant.makerAddress);
    var maker_tamount = eth.getTokenAmount(constant.makerAddress);  // token balanceof

    var mode = req.query.mode;
    var users = eth_check.getAll(mode); // user monitoring for debugging

    res.render('makers', {users:users,
                          maker : constant.makerAddress, maker_balance : maker_balance, maker_tamount : maker_tamount,
                          fund : constant.crowdFundContractAddress, fund_balance:fund_balance, fund_tamount:fund_tamount});
});

module.exports = router;
