db = db.getSiblingDB('local');

db.createCollection('users');

db.users.insertOne({
  username: "admin",
  password: "$2b$10$vxbwSKTCI.cI1qjRMZWOseXFDm8wYx2DhtbzOww98n1TxH.IaX6H.", // "password123" hashed with bcrypt
  displayName: "Admin User",
  isAdmin: true
})