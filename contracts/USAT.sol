pragma solidity ^0.4.18;

// modified from Moritz Neto with BokkyPooBah / Bok Consulting Pty Ltd Au 2017. 
// The MIT Licence.

// Added Open Zeppelin  
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract ApproveAndCallFallBack {
    function receiveApproval(address from, uint256 tokens, address token, bytes data) public;
}

contract USATToken is ERC20, Ownable, SafeMath {
    string public symbol;
    string public  name;
    uint8 public decimals;
    uint public _totalSupply;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;

    //event USATSenderCheck(address owner, address sender, address spender);
    //event USATAllowed(address owner, address from, address sender, address to, uint token, uint org, uint diff);
    constructor() public {
        symbol = "USAT";
        name = "USAT.IO Token";
        decimals = 18;
        _totalSupply = 1525000000000000000000000000; //1,525,000,000
        balances[owner] = _totalSupply;
        Transfer(address(0), owner, _totalSupply);
    }


    function totalSupply() public constant returns (uint) {
        return _totalSupply  - balances[address(0)];
    }


    function balanceOf(address tokenOwner) public constant returns (uint balance) {
        return balances[tokenOwner];
    }


    function transfer(address to, uint tokens) public returns (bool success) {
        balances[msg.sender] = safeSub(balances[msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        Transfer(msg.sender, to, tokens);
        
        return true;
    }


    function approve(address spender, uint tokens) public returns (bool success) {
        //emit USATSenderCheck(owner, msg.sender, spender);
        allowed[msg.sender][spender] = tokens;
        Approval(msg.sender, spender, tokens);
        return true;
    }   


    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        balances[from] = safeSub(balances[from], tokens);
        //emit USATAllowed(owner, from, msg.sender, to, tokens, allowed[from][msg.sender], allowed[from][msg.sender] - tokens);
        allowed[from][msg.sender] = safeSub(allowed[from][msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        Transfer(from, to, tokens);
        return true;
    }


    function allowance(address tokenOwner, address spender) public constant returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }


    function approveAndCall(address spender, uint tokens, bytes data) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        Approval(msg.sender, spender, tokens);
        ApproveAndCallFallBack(spender).receiveApproval(msg.sender, tokens, this, data);
        return true;
    }


    function () public payable {
        revert();
    }


    function transferAnyERC20Token(address tokenAddress, uint tokens) public onlyOwner returns (bool success) {
        return ERC20Interface(tokenAddress).transfer(owner, tokens);
    }
}
