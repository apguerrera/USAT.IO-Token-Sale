pragma solidity ^0.4.24;

// modified from Moritz Neto with BokkyPooBah / Bok Consulting Pty Ltd Au 2017. 
// The MIT Licence.

// Added Open Zeppelin  
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract USATToken is ERC20, Ownable {
    string public symbol;
    string public  name;
    uint8 public decimals;

    //event USATSenderCheck(address owner, address sender, address spender);
    //event USATAllowed(address owner, address from, address sender, address to, uint token, uint org, uint diff);
    constructor() public {
        symbol = "USAT";
        name = "USAT.IO Token";
        decimals = 18;
        _mint(owner(), 1525000000000000000000000000);
    }
}