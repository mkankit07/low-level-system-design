## System Design – JavaScript Implementations

This repository contains small, focused implementations of classic system-design style problems in JavaScript. Each subfolder is a self-contained module you can run and extend for practice or discussion.

### Repository Structure

- [access-management-system](access-management-system)
	- In-memory role-based access control (RBAC) system.
	- Core types in [access-management-system/index.js](access-management-system/index.js):
		- `AccessManager` manages roles, permissions, and user-role assignments.
		- Supports creating roles, granting permissions, assigning/revoking roles, and checking user permissions.
	- See [access-management-system/README.MD](access-management-system/README.MD) for detailed API docs and examples.

- [account_balance](account_balance)
	- Account balance tracker that processes text-based financial transactions.
	- Core logic in [account_balance/index.js](account_balance/index.js):
		- Supports `DEPOSIT`, `WITHDRAW`, and `TRANSFER` commands.
		- Normalizes usernames to title case and prevents overdrafts.
	- See [account_balance/README.MD](account_balance/README.MD) for full usage, rules, and review notes.

- [parking-lot-system](parking-lot-system)
	- Placeholder for a parking lot system design/implementation.
	- Entry point is [parking-lot-system/index.js](parking-lot-system/index.js) (currently empty, ready for implementation).
	- [parking-lot-system/README.MD](parking-lot-system/README.MD) can be used to describe the design once implemented.

### How to Run the Examples

Requirements:
- Node.js (any reasonably recent LTS version is fine).

From the repository root:

- Access Management System demo:
	- `node access-management-system/index.js`

- Account Balance Tracker (use from your own script or a REPL):
	- `node` then `require('./account_balance/index.js')`
	- Or copy the class into another project as needed.

The parking lot module currently has no implementation; you can treat it as a starting point for your own design.

### Purpose

- Practice reasoning about system design at a smaller, code-focused scale.
- Capture reference implementations that can be reused or evolved during interviews and internal discussions.
- Keep each problem isolated so behavior and trade-offs are easy to understand.

As you add new system-design problems, create a new folder with its own `index.js` (or more structured layout), a dedicated `README.MD`, and add a short entry for it in this top-level README.

