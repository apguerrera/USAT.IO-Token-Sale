
# USAT Token

## Code Review Audit

* [x] [code-review/USAT.md](code-review/USAT.md)
  * [x] interface IERC20
  * [x] library SafeMath
  * [x] contract ERC20
  * [x] contract Ownable
  * [x] contract USATOZ

  <br />

## Deployment

* [x] [contracts/USAT.sol](contracts/USAT.sol)

<br />


### Deployment Addresses

Contract                                | Address
:-------------------------------------- |:-------
USATOZ |   [0xC58aba8193a5e33764244eB07f41B91eF51EA3Ca](https://ropsten.etherscan.io/tx/0x20e287ec151357cfe4864c24eccaf9c776bc352dbb690dbddc4fb1bec961e1f9)

<br />


### Usability Testing

* [x] View Functions

<br />

#### totalSupply
```javascript
function totalSupply() external view returns (uint256);
```

Parameters:

No      | Value              | Notes
:------ |:----------------- |:----
uint | 1525000000000000000000000000   | 1.525 Billion tokens


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
<br />


(c) Adrian Guerrera / Deepyr Pty Ltd for USAT.io - Oct 09 2018. The MIT Licence.
