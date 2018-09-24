pragma solidity ^0.4.24;

// Thank you to BokkyPooBah / Bok Consulting Pty Ltd 2018, Moritz Neto 
// Originally based on code by FirstBlood: https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol
// MIT Licence.

// Added Open Zeppelin  

import "./token/ERC20/IERC20.sol";
import "./token/ERC20/ERC20.sol";
import "./ownership/Ownable.sol";

contract USATToken is ERC20, Ownable {
    string public constant name = "USAT.IO Token";
    string public constant symbol = "USAT";
    uint8 public constant decimals = 18;

    //event USATSenderCheck(address owner, address sender, address spender);
    //event USATAllowed(address owner, address from, address sender, address to, uint token, uint org, uint diff);
    constructor() public {
             _mint(owner(), 1525000000000000000000000000);
    }
}