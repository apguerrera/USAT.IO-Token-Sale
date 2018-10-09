
# USAT Token

## Code Review

* [x] [code-review/USAT.md](code-review/USAT.md)
  * [x] interface IERC20
  * [x] library SafeMath
  * [x] contract ERC20
  * [x] contract Ownable
  * [x] contract USATOZ

  <br />


#### Findings
  * [] **MEDIUM IMPORTANCE** When people send ETH to the contract, it should fail.
    * [] Might want to add a revert for the default callback.
  * [] **LOW IMPORTANCE** When people send ERC20 tokens to the contract, contract owner should be able to transfer them.
    * [] Could add generic ERC20 interface and transfer function with onlyOwner modifier.
  * [] **LOW IMPORTANCE** Mint and burn function is not utilised throughout contract.
    * [] Could consider either making the contract mintable or allocate tokens to the owner within the constructor and remove unused internal functions.
  * [] **LOW IMPORTANCE** USATOZ contract doesn't use onlyOwner modifier
      * [] Not explicitly used in this token contract but could be useful later.
  * [] **NOTE** renounceOwnership() does exactly what it describes. Be cautious as it is irreversible.
  * [] **NOTE** transferOwnership() requires extra gas when attempted from a unowned account before its failure. Still behaves as expected though.

<br />

#### Revert Example
```javascript
// ------------------------------------------------------------------------
// Don't accept ETH
// ------------------------------------------------------------------------
function () public payable {
    revert();
}
```
<br />

#### Token Return Example
```javascript
// ------------------------------------------------------------------------
// Owner can transfer out any accidentally sent ERC20 tokens
// ------------------------------------------------------------------------
function transferAnyERC20Token(address tokenAddress, uint tokens) public onlyOwner returns (bool success) {
    return IERC20(tokenAddress).transfer(owner, tokens);
}
```
<br />

## Deployment

* [x] [contracts/USAT.sol](contracts/USAT.sol)

<br />


### Deployment Addresses

Contract                                | Address
:-------------------------------------- |:-------
USATOZ |   [0xC58aba8193a5e33764244eB07f41B91eF51EA3Ca](https://ropsten.etherscan.io/tx/0x20e287ec151357cfe4864c24eccaf9c776bc352dbb690dbddc4fb1bec961e1f9)

<br />

Account                           | Address
:-------------------------------- |:-------
owner   | 0xf1bfb2aca2bbb78976523b499b525c2c245ea209
tester1 | 0xa0c7deea2057ce49b1a8d1df9e90f2aa364f840a
tester2 | 0xb7b461d9ba5e1fd0fef9ba8b1ee01ca815609609

<br />

## Usability Testing

* [x] View Functions
  * [x] name
  * [x] symbol
  * [x] decimals
  * [x] totalSupply
  * [x] balanceOf
  * [x] owner
  * [x] isOwner
* [x] Allowance Functions
  * [x] approve
  * [x] allowance
  * [x] increaseAllowance
  * [x] decreaseAllowance
* [x] Transfer Functions
  * [x] transfer
  * [x] transferFrom
* [x] Ownership Functions
  * [x] transferOwnership
  * [x] renounceOwnership


<br />

### Contract Variables
#### Set Variables

Parameters:

No      | Value              | Notes
:------ |:----------------- |:----
string | USAT   | symbol
string | USAT.IO IP Platform   | name
uint8 | 18    | decimals


<br />


#### totalSupply
```javascript
function totalSupply() external view returns (uint256);
```

Parameters:

No      | Value              | Notes
:------ |:----------------- |:----
uint | 1525000000000000000000000000   | 1.525 Billion tokens

<br />

#### balanceOf
```javascript
function balanceOf(address who) external view returns (uint256);
```
Input:

0xf1bfb2aca2bbb78976523b499b525c2c245ea209

Parameters:

No      | Value              | Notes
:------ |:----------------- |:----
uint | 1525000000000000000000000000   | 1.525 Billion tokens

<br />

#### owner
```javascript
  function owner() public view returns (address)
```

Parameters:

No      | Value              | Notes
:------ |:----------------- |:----
address | 0xf1bfb2aca2bbb78976523b499b525c2c245ea209   | Contract creator

<br />

#### isOwner
```javascript
  function isOwner() public view returns (bool)
```

Parameters:

No      | Value              | Notes
:------ |:----------------- |:----
bool | true   | 0xf1bfb2aca2bbb78976523b499b525c2c245ea209 (owner)
bool | false  | 0xa0c7deea2057ce49b1a8d1df9e90f2aa364f840a


<br />
<br />


(c) Adrian Guerrera / Deepyr Pty Ltd for USAT.io - Oct 09 2018. The MIT Licence.
