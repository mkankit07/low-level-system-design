# Account Balance Tracker

A lightweight JavaScript class for managing account balances and processing financial transactions including deposits, withdrawals, and transfers.

## Features

- **Deposit**: Add funds to an account
- **Withdraw**: Remove funds from an account (with balance validation)
- **Transfer**: Move funds between accounts (with balance validation)
- **Case-insensitive usernames**: Automatically normalizes user names to title case
- **Balance protection**: Prevents overdrafts and invalid operations

## Installation

Simply include the `index.js` file in your project.

## Usage

### Basic Example

```javascript
const abt = new AccountBalanceTracker();

// Process a series of transactions
const transactions = [
  "DEPOSIT Alice 100",
  "DEPOSIT Bob 50",
  "WITHDRAW Alice 30",
  "TRANSFER Alice Bob 20"
];

abt.processTransactions(transactions);

// Check user balance
const aliceBalance = abt.getUserBalance("Alice"); // Returns: 50
const bobBalance = abt.getUserBalance("Bob");     // Returns: 70
```

## API Reference

### Constructor

```javascript
new AccountBalanceTracker()
```

Creates a new instance of the Account Balance Tracker.

### Methods

#### `processTransactions(transactions)`

Processes an array of transaction strings.

**Parameters:**
- `transactions` (Array<string>): Array of transaction command strings

**Transaction Format:**
- **Deposit**: `"DEPOSIT <username> <amount>"`
- **Withdraw**: `"WITHDRAW <username> <amount>"`
- **Transfer**: `"TRANSFER <from_user> <to_user> <amount>"`

**Example:**
```javascript
abt.processTransactions([
  "DEPOSIT John 1000",
  "WITHDRAW John 200",
  "TRANSFER John Jane 300"
]);
```

#### `getUserBalance(user)`

Retrieves the balance for a specific user.

**Parameters:**
- `user` (string): The username (case-insensitive)

**Returns:**
- (number): The current balance

**Throws:**
- Error if user doesn't exist

**Example:**
```javascript
const balance = abt.getUserBalance("john"); // Case-insensitive
```

#### `getBalance(user)`

Internal method to safely get a user's balance (returns 0 if user doesn't exist).

**Parameters:**
- `user` (string): The username

**Returns:**
- (number): The current balance or 0

#### `setBalance(user, balance)`

Internal method to set a user's balance.

**Parameters:**
- `user` (string): The username
- `balance` (number): The balance to set

## Transaction Rules

1. **Deposits**: Always succeed and create the account if it doesn't exist
2. **Withdrawals**: Only succeed if the account has sufficient funds
3. **Transfers**: Only succeed if the source account has sufficient funds
4. **Username Normalization**: All usernames are converted to title case (e.g., "alice" → "Alice")
5. **Invalid Operations**: Transactions with insufficient funds are silently ignored

## Implementation Details

### Data Structure

- Uses a `Map` to store account balances for efficient lookups
- Key: Username (title case)
- Value: Account balance (number)

### Error Handling

- Invalid operations throw errors
- Invalid transaction formats are skipped
- Empty or whitespace-only transactions are ignored
- Insufficient funds for withdrawals/transfers are silently skipped

### Input Validation

- Transaction strings are trimmed of whitespace
- Operations must have at least 3 parts
- Amounts are parsed as numbers
- Operation names are case-insensitive (converted to uppercase)

## Code Review Notes

### Strengths
- Clean, modular design with single responsibility methods
- Proper balance validation prevents overdrafts
- Case-insensitive username handling improves usability
- Efficient use of Map data structure

### Potential Improvements
1. **Bug in getUserBalance**: Line 85 returns `this.accounts.get(user)` but should use `key` variable
   ```javascript
   // Current (incorrect):
   return this.accounts.get(user);
   
   // Should be:
   return this.accounts.get(key);
   ```

2. **Transaction History**: Consider adding a transaction log for audit purposes
3. **Return Values**: `processTransactions` could return success/failure status
4. **Validation**: Add amount validation (e.g., negative amounts, NaN)
5. **Type Safety**: Consider TypeScript for better type checking

## Example Scenarios

### Scenario 1: Basic Banking Operations
```javascript
const tracker = new AccountBalanceTracker();
tracker.processTransactions([
  "DEPOSIT alice 500",
  "DEPOSIT bob 300",
  "WITHDRAW alice 100",
  "TRANSFER bob alice 50"
]);

console.log(tracker.getUserBalance("Alice")); // 450
console.log(tracker.getUserBalance("Bob"));   // 250
```

### Scenario 2: Insufficient Funds
```javascript
const tracker = new AccountBalanceTracker();
tracker.processTransactions([
  "DEPOSIT charlie 100",
  "WITHDRAW charlie 200"  // Fails silently - insufficient funds
]);

console.log(tracker.getUserBalance("Charlie")); // 100 (withdrawal was ignored)
```

## License

This is a system design implementation for educational purposes.
