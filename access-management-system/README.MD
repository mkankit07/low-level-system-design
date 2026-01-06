## Access Management System

This module implements a simple in-memory role-based access control (RBAC) system.
It lets you:
- Create roles
- Grant permissions to roles
- Assign roles to users
- Check whether a user has a given permission

### Core Concepts

- **Role**: Represents a named role (for example, `admin`, `user`) and holds a set of permissions.
- **AccessManager**: Manages roles and user-role mappings.

### API Overview

The main class is `AccessManager` defined in `index.js`:

- `createRole(name)`
	- Creates a new role with the given `name`.
	- Throws an error if the role already exists.

- `grantPermission(roleName, permission)`
	- Adds the `permission` (string) to the specified role.

- `assignRole(userId, roleName)`
	- Assigns a role to a user.
	- A user can have multiple roles.

- `revokeRole(userId, roleName)`
	- Removes a role from the user if present.

- `hasPermission(userId, permission) -> boolean`
	- Returns `true` if the user has at least one role with the given permission, otherwise `false`.

### Example Usage

```js
const AccessManager = require('./index'); // if exported as a module

const ams = new AccessManager();

// Create roles
ams.createRole('admin');
ams.createRole('user');

// Grant permissions
ams.grantPermission('admin', 'delete_user');
ams.grantPermission('admin', 'ban_user');
ams.grantPermission('user', 'read_posts');

// Assign roles to users
ams.assignRole('alice', 'admin');
ams.assignRole('bob', 'user');

// Check permissions
ams.hasPermission('alice', 'delete_user'); // true
ams.hasPermission('bob', 'delete_user');   // false
ams.hasPermission('alice', 'read_posts');  // false (only user role has this)
```

In the current setup, `index.js` contains both the class implementation and a small script
that demonstrates usage and logs the internal state and permission checks.

### Notes

- This implementation is purely in-memory and not intended for production.
- It is useful for learning and system design practice around RBAC.

