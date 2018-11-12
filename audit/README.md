
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
  * [] **MEDIUM IMPORTANCE** USATOZ contract doesn't use onlyOwner modifier  
    * [] Changing the constructor to \_mint(msg.sender, xxxx) will remove the need for Owned contract
  * [] **LOW IMPORTANCE** When people send ERC20 tokens to the contract, contract owner should be able to transfer them.
    * [] Could add generic ERC20 interface and transfer function with onlyOwner modifier.    
  * [] **LOW IMPORTANCE** Mint and burn function is not utilised throughout contract.
    * [] Could consider either making the contract mintable or allocate tokens to the owner within the constructor and remove unused internal functions.
  * [] **NOTE** renounceOwnership() does exactly what it describes. Be cautious as it is irreversible.
  * [] **NOTE** transferOwnership() requires extra gas when attempted from a unowned account before its failure. Still behaves as expected though.

<br />

#### Constructor Example
```javascript
// ------------------------------------------------------------------------
// Constructor mints tokens to the sender
// ------------------------------------------------------------------------
constructor() public {
     _mint(msg.sender, 1525000000000000000000000000);
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
USATOZ |   [0x36b874D647F91c87a51cC4e2a026577998A79114](https://etherscan.io/tx/0x74ec5c21ebf2aee53d2a1fb61eb6220ea88c247e72684a3eb78a477bd0c3e793)

<br />

Account                           | Address
:-------------------------------- |:-------
owner   | 0x04550faeb8a409b7c5e080d367fd36034d05b37e

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

0x04550faeb8a409b7c5e080d367fd36034d05b37e

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
address | 0x04550faeb8a409b7c5e080d367fd36034d05b37e   | Contract creator

<br />

#### isOwner
```javascript
  function isOwner() public view returns (bool)
```

Parameters:

No      | Value              | Notes
:------ |:----------------- |:----
bool | true   | 0x04550faeb8a409b7c5e080d367fd36034d05b37e (owner)
bool | false  | 0xa0c7deea2057ce49b1a8d1df9e90f2aa364f840a


<br />
<br />


(c) Adrian Guerrera / Deepyr Pty Ltd for USAT.io - Oct 09 2018. The MIT Licence.
