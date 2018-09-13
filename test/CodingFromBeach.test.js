'use strict';
const CodingFromBeach = artifacts.require("./CodingFromBeach.sol");

/**
 *  Chai and web3.BigNumber are used as x.is.bignumber.equal().
 *  This allows us to compare big expoential numbers without losing precision.
 */

const BigNumber = web3.BigNumber;
BigNumber.config({ DECIMAL_PLACES: 18, ROUNDING_MODE: BigNumber.ROUND_DOWN });

require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

const Utils = require('./helpers/utils');	

let tokenInstance;
let owner;

contract('CodingFromBeach' , (accounts) => {
	owner = accounts[0]; // see scripts/ganache-cli.sh or truffle.js rinkeby for full list of accounts

	beforeEach(async () => {
		tokenInstance = await CodingFromBeach.new({from: owner})
		// You can find a definition of all the methods and attributes available on tokenInstance in the 'abi' property in /build/contracts/CodingFromBeach.sol
	});

	it('should make me feel good that at least one test has passed', async () => {
		let meFeelGood = true;
		meFeelGood.should.be.equal(true);
	})

	// Example 1 tests
	/*
	it('should match owner' , async () => {
		let expectedOwner = await tokenInstance.owner.call();
		expectedOwner.should.be.equal(owner);
	});
	it('should match name' , async () => {
		let name = await tokenInstance.name.call();
		name.should.be.equal('CodingFromBeach');
	});

	it('should match symbol' , async () => {
		let symbol = await tokenInstance.symbol.call();
		symbol.should.be.equal('CFB');
	});

	it('should match decimals' , async () => {
		let decimals = await tokenInstance.decimals.call();
		decimals.should.be.bignumber.equal(18);
	});

	it('should match totalSupply' , async () => {
		let totalSupply = await tokenInstance.totalSupply.call();
		totalSupply.should.be.bignumber.equal(1000000000E18);
	});

	it('owner should have full balance' , async () => {
		let balance = await tokenInstance.balanceOf.call(owner);
		balance.should.be.bignumber.equal(1000000000E18);
	});
	*/

	// Example 2 tests
	/*
	it('should be able to transfer tokens' , async () => {
		let account = accounts[4]; // this is just a random, non-ownser account from the list in defined in scripts/ganache-cli.sh it works locally only
		let amount = 1E18;
		
		// Starting from scratch, the owner should have all the tokens
		let ownerBalance = await tokenInstance.balanceOf.call(owner);
		ownerBalance.should.be.bignumber.equal(1000000000E18);

		// Starting from scratch, the account requesting should have 0 tokens
		let accountBalance = await tokenInstance.balanceOf.call(account);
		accountBalance.should.be.bignumber.equal(0);		

		// Do the transfer from owner to account
		await tokenInstance.transfer(account, amount, {from: owner});

		// Did the account balance increase equal to the amount requested?
		accountBalance = await tokenInstance.balanceOf.call(account);
		accountBalance.should.be.bignumber.equal(amount);		

		// Did the owners token balance reduce by the amount sent to the account?
		let revisedBalance = await tokenInstance.balanceOf.call(owner);
		revisedBalance.should.be.bignumber.equal(ownerBalance.sub(amount));		
	});	

	it('should throw an error when trying to transfer more than balance', async () => {
		let balance = await tokenInstance.balanceOf.call(owner);
		let account = accounts[1];
		let overBalance = balance.add(1E18);	
		Utils.assert_throw(tokenInstance.transfer(account, overBalance));
	});
	*/

	// Example 3 tests
	/*
	// FYI- ganache-cli.sh will initialize ether accounts with balance of some 1000000 eth each.
	it('should allow buyer to buy token by sending ether transaction' , async () => {
		let account = accounts[2];

		// Find buyer balance to verify its 0 because we have not bought tokens yet
		let buyerBalanceBefore = await tokenInstance.balanceOf.call(account);
		buyerBalanceBefore.should.be.bignumber.equal(0);

		// Wwner should have full balance because nothing is transferred or bought yet
		let ownerBalanceBefore = await tokenInstance.balanceOf.call(owner);
		ownerBalanceBefore.should.be.bignumber.equal(1000000000E18);

		// sendTransaction is web3 standard method which sends 'value' amount of ether from 'from' address to tokenInstance contract's address.
		// This is like using myether wallet where TO address is tokenInstance address and value is 1E18.
		// Now if you open CodingFromBeach.sol you will see default payable function which gets triggered calling the buy function
		await tokenInstance.sendTransaction({from: account, value: 1E18});

		// CodingFromBeach.sol has pricePerToken variable which is 0.0000200 ether per token so by sending 1 eth you get 1E18/0.0000200 = 50000E18 tokens :)
		let buyerBalanceAfter = await tokenInstance.balanceOf.call(account);
		// this checks that balance after is equal to balancebefore + bought token
		buyerBalanceAfter.should.be.bignumber.equal(buyerBalanceBefore.add(50000E18));

		let ownerBalanceAfter = await tokenInstance.balanceOf.call(owner);
		// this checks that balance after is equal to balancebefore - bought token. Because tokens are sent from owner balance when soemoen sends eth
		ownerBalanceAfter.should.be.bignumber.equal(ownerBalanceBefore.sub(50000E18));
	});
	*/

});
