class Role {
  constructor(name) {
    this.name = name;
    this.permissions = new Set();
  }
}

class AccessManager {
  constructor() {
    this.roles = new Map();
    this.userRole = new Map();
  }

  createRole(name) {
    if (this.roles.has(name)) {
      throw new Error(`Role ${name} already exists`);
    }
    this.roles.set(name, new Role(name));
  }

  getRole(name) {
    const role = this.roles.get(name);
    if (!role) {
      throw new Error(`Unknown role: ${name}`);
    }
    return role;
  }

  grantPermission(role, permission) {
    this.getRole(role).permissions.add(permission);
  }

  assignRole(user, role) {
    this.getRole(role);
    if (!this.userRole.has(user)) {
      this.userRole.set(user, new Set());
    }
    this.userRole.get(user).add(role);
  }

  revokeRole(user, role) {
    const userRoles = this.userRole.get(user);
    if (userRoles) {
      userRoles.delete(role);
    }
  }

  hasPermission(user, permission) {
    const userRoles = this.userRole.get(user);
    if (!userRoles) {
      return false;
    }
    for (const role of userRoles) {
      if (this.roles.get(role).permissions.has(permission)) {
        return true;
      }
    }
    return false;
  }
}

// Your code will be instantiated and invoked as follows:

const ams = new AccessManager();

function logState(step) {
  const roles = {};
  for (const [name, role] of ams.roles.entries()) {
    roles[name] = Array.from(role.permissions.values());
  }

  const userRoles = {};
  for (const [user, rolesSet] of ams.userRole.entries()) {
    userRoles[user] = Array.from(rolesSet.values());
  }

  console.log("====================");
  console.log(step);
  console.log("Roles:", roles);
  console.log("User Roles:", userRoles);
}

ams.createRole("admin");
logState("After creating role: admin");
ams.createRole("user");
logState("After creating role: user");
ams.createRole("developer");
logState("After creating role: developer");
ams.grantPermission("admin", "delete_user");
logState("After granting delete_user to admin");
ams.grantPermission("admin", "ban_user");
logState("After granting ban_user to admin");
ams.grantPermission("developer", "commit_code");
logState("After granting commit_code to developer");
ams.grantPermission("developer", "read_posts");
logState("After granting read_posts to developer");
ams.grantPermission("user", "read_posts");
logState("After granting read_posts to user");
ams.assignRole("alice", "admin");
logState("After assigning admin to alice");
ams.assignRole("bob", "user");
logState("After assigning user to bob");

function logPermissionCheck(user, permission) {
  const result = ams.hasPermission(user, permission);
  console.log("====================");
  console.log(`Permission check -> user: ${user}, permission: ${permission}, allowed: ${result}`);
}

logPermissionCheck("alice", "delete_user");
logPermissionCheck("bob", "delete_user");
logPermissionCheck("alice", "read_posts");
ams.revokeRole("alice", "admin");
logState("After revoking admin from alice");
logPermissionCheck("alice", "delete_user");

