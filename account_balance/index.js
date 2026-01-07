class AccountBalanceTracker {
  constructor() {
    this.accounts = new Map();
  }

  toTitle(name) {
    return name
      ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      : name;
  }

  parseThreePartOperation(parts) {
    const operation = parts[0].toUpperCase();
    const user = this.toTitle(parts[1]);
    const amount = Number(parts[2]);
    return [operation, user, amount];
  }

  parseFourPartOperation(parts) {
    const operation = parts[0].toUpperCase();
    const transferre = this.toTitle(parts[1]);
    const transferree = this.toTitle(parts[2]);
    const amount = Number(parts[3]);
    return [operation, transferre, transferree, amount];
  }

  getBalance(user) {
    return this.accounts.get(user) || 0;
  }

  setBalance(user, balance) {
    this.accounts.set(user, balance);
  }

  _processTransaction(parts) {
    if (parts.length === 3) {
      const [operation, user, amount] = this.parseThreePartOperation(parts);
      if (operation === "DEPOSIT") {
        this.setBalance(user, this.getBalance(user) + amount);
      } else if (operation === "WITHDRAW") {
        if (amount <= this.getBalance(user)) {
          this.setBalance(user, this.getBalance(user) - amount);
        }
      } else {
        throw new Error(`Invalid operation ${operation}`);
      }
    } else if (parts.length === 4) {
      const [operation, transferre, transferree, amount] =
        this.parseFourPartOperation(parts);
      if (operation === "TRANSFER") {
        if (amount <= this.getBalance(transferre)) {
          this.setBalance(transferre, this.getBalance(transferre) - amount);
          this.setBalance(transferree, this.getBalance(transferree) + amount);
        }
      } else {
        throw new Error(`Invalid operation: ${operation}`);
      }
    } else {
      throw new Error("Invalid number of part " + parts.length);
    }
  }

  processTransactions(transactions) {
    for (const transaction of transactions) {
      const stripped = transaction.trim();
      if (!stripped) {
        continue;
      }
      const parts = stripped.split(" ");
      if (parts.length < 3) {
        continue;
      }
      this._processTransaction(parts);
    }
  }

  getUserBalance(user) {
    const key = this.toTitle(user);
    if (!this.accounts.has(key)) {
      throw new Error(`User ${user} not found`);
    }
    return this.accounts.get(user);
  }
}

// Your code will be instantiated and invoked as follows:
/*
const abt = new AccountBalanceTracker();
abt.processTransactions(transactions);
abt.getUserBalance(user);
*/
