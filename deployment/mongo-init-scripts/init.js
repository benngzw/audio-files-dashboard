db = db.getSiblingDB('local');

db.createCollection('users');

db.users.insertOne({
  username: "admin",
  password: "password123",
  displayName: "Admin User",
  isAdmin: true
})