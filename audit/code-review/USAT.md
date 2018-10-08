# USAT Code Review

Source file [../contracts/USAT.sol](../contracts/USAT.sol).

<br />

<hr />

```solidity
// AG Ok
pragma solidity ^0.4.24;

//USATOZ.sol v1.0

// Thank you to BokkyPooBah / Bok Consulting Pty Ltd 2018, Moritz Neto
// Originally based on code by FirstBlood: https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol
// MIT Licence.

// Using OpenZeppelin Forked from OpenZeppelin/openzeppelin-solidity
// Start openzeppelin-solidity import IERC20, ERC20, Ownable, SafeMath

// Multi file code previously used import function
// Flattened for use on Remix.Ethereum.org

/**
 * @title ERC20 interface IERC20.sol
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */

// AG Ok
interface IERC20 {
  // AG Ok - External view preferred over public constants for these functions
  function totalSupply() external view returns (uint256);
  // AG Ok
  function balanceOf(address who) external view returns (uint256);
  // AG Ok
  function allowance(address owner, address spender)
    external view returns (uint256);
  // AG Ok
  function transfer(address to, uint256 value) external returns (bool);
  // AG Ok
  function approve(address spender, uint256 value)
    external returns (bool);
  // AG Ok
  function transferFrom(address from, address to, uint256 value)
    external returns (bool);
  // AG Ok - Event
  event Transfer(
    address indexed from,
    address indexed to,
    uint256 value
  );
  // AG Ok - Event
  event Approval(
    address indexed owner,
    address indexed spender,
    uint256 value
  );
}

// End import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

/**
 * @title SafeMath.sol
 * @dev Math operations with safety checks that revert on error
 */

// AG Ok
library SafeMath {

  /**
  * @dev Multiplies two numbers, reverts on overflow.
  */
  // AG Ok
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
    // benefit is lost if 'b' is also tested.
    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
    // AG Ok
    if (a == 0) {
      // AG Ok
      return 0;
    }
    // AG Ok
    uint256 c = a * b;
    // AG Ok
    require(c / a == b);
    // AG Ok
    return c;
  }

  /**
  * @dev Integer division of two numbers truncating the quotient, reverts on division by zero.
  */
  // AG Ok
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // AG Ok
    require(b > 0); // Solidity only automatically asserts when dividing by 0
    // AG Ok
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    // AG Ok
    return c;
  }

  /**
  * @dev Subtracts two numbers, reverts on overflow (i.e. if subtrahend is greater than minuend).
  */
  // AG Ok
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    // AG Ok
    require(b <= a);
    // AG Ok
    uint256 c = a - b;
    // AG Ok
    return c;
  }

  /**
  * @dev Adds two numbers, reverts on overflow.
  */
  // AG Ok
  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    // AG Ok
    uint256 c = a + b;
    // AG Ok
    require(c >= a);
    // AG Ok
    return c;
  }

  /**
  * @dev Divides two numbers and returns the remainder (unsigned integer modulo),
  * reverts when dividing by zero.
  */
  // AG Ok
  function mod(uint256 a, uint256 b) internal pure returns (uint256) {
    // AG Ok
    require(b != 0);
    // AG Ok
    return a % b;
  }
}
// End import "openzeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title Standard ERC20.sol token
 *
 * @dev Implementation of the basic standard token.
 * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
 * Originally based on code by FirstBlood: https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol
 */
// AG Ok
contract ERC20 is IERC20 {
  // AG Ok - Library import
  using SafeMath for uint256;
  // AG Ok
  mapping (address => uint256) private _balances;
  // AG Ok
  mapping (address => mapping (address => uint256)) private _allowed;
  // AG Ok
  uint256 private _totalSupply;

  /**
  * @dev Total number of tokens in existence
  */
  // AG Ok - Public view
  function totalSupply() public view returns (uint256) {
    // AG Ok
    return _totalSupply;
  }

  /**
  * @dev Gets the balance of the specified address.
  * @param owner The address to query the balance of.
  * @return An uint256 representing the amount owned by the passed address.
  */
  // AG Ok - Public view
  function balanceOf(address owner) public view returns (uint256) {
    // AG Ok
    return _balances[owner];
  }

  /**
   * @dev Function to check the amount of tokens that an owner allowed to a spender.
   * @param owner address The address which owns the funds.
   * @param spender address The address which will spend the funds.
   * @return A uint256 specifying the amount of tokens still available for the spender.
   */
  // AG Ok - Public view
  function allowance(
    address owner,
    address spender
   )
    public
    view
    returns (uint256)
  {
    // AG Ok
    return _allowed[owner][spender];
  }

  /**
  * @dev Transfer token for a specified address
  * @param to The address to transfer to.
  * @param value The amount to be transferred.
  */
  // AG Ok - Public function
  function transfer(address to, uint256 value) public returns (bool) {
    // AG Ok - Has token balance
    require(value <= _balances[msg.sender]);
    // AG Ok - Ensure tokens are not burnt
    require(to != address(0));
    // AG Ok - SafeMath
    _balances[msg.sender] = _balances[msg.sender].sub(value);
    // AG Ok - SafeMath
    _balances[to] = _balances[to].add(value);
    // AG Ok - Event
    emit Transfer(msg.sender, to, value);
    // AG Ok
    return true;
  }

  /**
   * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
   * Beware that changing an allowance with this method brings the risk that someone may use both the old
   * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
   * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
   * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
   * @param spender The address which will spend the funds.
   * @param value The amount of tokens to be spent.
   */
  // AG Ok - Public function
  function approve(address spender, uint256 value) public returns (bool) {
    // AG Ok
    require(spender != address(0));
    // AG Ok
    _allowed[msg.sender][spender] = value;
    // AG Ok - Event
    emit Approval(msg.sender, spender, value);
    // AG Ok
    return true;
  }

  /**
   * @dev Transfer tokens from one address to another
   * @param from address The address which you want to send tokens from
   * @param to address The address which you want to transfer to
   * @param value uint256 the amount of tokens to be transferred
   */
  // AG Ok - Public function
  function transferFrom(
    address from,
    address to,
    uint256 value
  )
    public
    returns (bool)
  {
    // AG Ok
    require(value <= _balances[from]);
    // AG Ok - ** Transfer from allowance
    require(value <= _allowed[from][msg.sender]);
    // AG Ok
    require(to != address(0));
    // AG Ok - SafeMath
    _balances[from] = _balances[from].sub(value);
    // AG Ok - SafeMath
    _balances[to] = _balances[to].add(value);
    // AG Ok - Might want to move the allowances above the token transfer
    _allowed[from][msg.sender] = _allowed[from][msg.sender].sub(value);
    // AG Ok - Event
    emit Transfer(from, to, value);
    // AG Ok
    return true;
  }

  /**
   * @dev Increase the amount of tokens that an owner allowed to a spender.
   * approve should be called when allowed_[_spender] == 0. To increment
   * allowed value is better to use this function to avoid 2 calls (and wait until
   * the first transaction is mined)
   * From MonolithDAO Token.sol
   * @param spender The address which will spend the funds.
   * @param addedValue The amount of tokens to increase the allowance by.
   */
  // AG Ok - Public function
  function increaseAllowance(
    address spender,
    uint256 addedValue
  )
    public
    returns (bool)
  {
    // AG Ok
    require(spender != address(0));
    // AG Ok
    _allowed[msg.sender][spender] = (
      _allowed[msg.sender][spender].add(addedValue));
    // AG Ok - Event
    emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
    return true;
  }

  /**
   * @dev Decrease the amount of tokens that an owner allowed to a spender.
   * approve should be called when allowed_[_spender] == 0. To decrement
   * allowed value is better to use this function to avoid 2 calls (and wait until
   * the first transaction is mined)
   * From MonolithDAO Token.sol
   * @param spender The address which will spend the funds.
   * @param subtractedValue The amount of tokens to decrease the allowance by.
   */
  // AG Ok - Public function
  function decreaseAllowance(
    address spender,
    uint256 subtractedValue
  )
    public
    returns (bool)
  {
    // AG Ok
    require(spender != address(0));
    // AG Ok
    _allowed[msg.sender][spender] = (
      _allowed[msg.sender][spender].sub(subtractedValue));
    // AG Ok - Event
    emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
    // AG Ok
    return true;
  }

  /**
   * @dev Internal function that mints an amount of the token and assigns it to
   * an account. This encapsulates the modification of balances such that the
   * proper events are emitted.
   * @param account The account that will receive the created tokens.
   * @param amount The amount that will be created.
   */
   // AG Ok - Internal function, only used once in constructor
  function _mint(address account, uint256 amount) internal {
    // AG Ok - Does not burn newly minted tokens
    require(account != 0);
    // AG Ok
    _totalSupply = _totalSupply.add(amount);
    // AG Ok
    _balances[account] = _balances[account].add(amount);
    // AG Ok - Event, mints from the null address
    emit Transfer(address(0), account, amount);
  }

  /**
   * @dev Internal function that burns an amount of the token of a given
   * account.
   * @param account The account whose tokens will be burnt.
   * @param amount The amount that will be burnt.
   */
  // AG Ok - Internal function, not used in contract
  function _burn(address account, uint256 amount) internal {
    // AG Ok
    require(account != 0);
    //  AG Ok
    require(amount <= _balances[account]);
    // AG Ok
    _totalSupply = _totalSupply.sub(amount);
    // AG Ok
    _balances[account] = _balances[account].sub(amount);
    // AG Ok - Event
    emit Transfer(account, address(0), amount);
  }

  /**
   * @dev Internal function that burns an amount of the token of a given
   * account, deducting from the sender's allowance for said account. Uses the
   * internal burn function.
   * @param account The account whose tokens will be burnt.
   * @param amount The amount that will be burnt.
   */
  // AG Ok - Internal function, not used
  function _burnFrom(address account, uint256 amount) internal {
    require(amount <= _allowed[account][msg.sender]);

    // Should https://github.com/OpenZeppelin/zeppelin-solidity/issues/707 be accepted,
    // this function needs to emit an event with the updated approval.
    // AG Ok
    _allowed[account][msg.sender] = _allowed[account][msg.sender].sub(
      amount);
    // AG Ok - Internal function, burns tokens by sending them to address(0)
    _burn(account, amount);
  }
}
// End import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

/**
 * @title Ownable.sol
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
// AG Ok - Standard authentication
contract Ownable {
  // AG Ok
  address private _owner;
  // AG Ok - Next 2 events
  event OwnershipRenounced(address indexed previousOwner);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );

  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  // AG Ok
  constructor() public {
    // AG Ok
    _owner = msg.sender;
  }

  /**
   * @return the address of the owner.
   */
  // AG Ok
  function owner() public view returns(address) {
    // AG Ok
    return _owner;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  // AG Ok
  modifier onlyOwner() {
    // AG Ok - Returns true
    require(isOwner());
    // AG Ok - End of modifier
    _;
  }

  /**
   * @return true if `msg.sender` is the owner of the contract.
   */
  // AG Ok - Public function
  function isOwner() public view returns(bool) {
    // AG Ok
    return msg.sender == _owner;
  }

  /**
   * @dev Allows the current owner to relinquish control of the contract.
   * @notice Renouncing to ownership will leave the contract without an owner.
   * It will not be possible to call the functions with the `onlyOwner`
   * modifier anymore.
   */
  // AG Ok - Only owner
  function renounceOwnership() public onlyOwner {
    // AG Ok
    emit OwnershipRenounced(_owner);
    // AG Ok
    _owner = address(0);
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  // AG Ok - Only owner
  function transferOwnership(address newOwner) public onlyOwner {
    // AG Ok - Internal function, replaces _owner
    _transferOwnership(newOwner);
  }

  /**
   * @dev Transfers control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  // AG Ok - Internal function
  function _transferOwnership(address newOwner) internal {
    // AG Ok
    require(newOwner != address(0));
    // AG Ok - Event
    emit OwnershipTransferred(_owner, newOwner);
    // AG Ok
    _owner = newOwner;
  }
}

// End import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

//Begin USATOZ Token
// AG Ok - Token contract
contract USATOZ is ERC20, Ownable {
    // AG Ok - Could also define variables in the constructor but equivalent
    string public constant name = "USAT.IO IP Platform";
    // AG Ok
    string public constant symbol = "USAT";
    // AG Ok
    uint8 public constant decimals = 18;
        // AG Ok
        constructor() public {
            // might want to do some checking on the owner
            // AG Ok - Mint from address(0) to owner, 1.525 x10^24 = 1.525 billion tokens
             _mint(owner(), 1525000000000000000000000000);
    }
}
```
