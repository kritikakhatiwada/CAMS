require("dotenv").config(); // Load environment variables
const mysql = require("mysql2/promise"); // Use mysql2 for direct connection
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

const NUM_USERS = 10; // Change this for more users

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "165.22.219.64",
      user: "cams",
      password: "C_@W$pro2081",
      database: "cams",
      port: 9281,
    });

    console.log("✅ Database connected successfully!");
    return connection;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

const generateRandomUsers = async () => {
  const connection = await connectDB();
  try {
    const hashedPassword = await bcrypt.hash("student", 10); // Hash "student"

    const users = [];
    const createdAt = new Date();
    const updatedAt = new Date();

    // Generate users
    for (let i = 0; i < NUM_USERS; i++) {
      users.push([
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        hashedPassword, // Use hashed password for security
        faker.location.streetAddress(),
        faker.phone.number(),
        faker.image.avatar(),
        createdAt, // Explicitly provide createdAt
        updatedAt, // Explicitly provide updatedAt
      ]);
    }

    const sql = `INSERT INTO users (firstName, lastName, email, password, address, phone, imageUrl, createdAt, updatedAt) VALUES ?`;
    const [userResults] = await connection.query(sql, [users]); // Bulk insert users

    console.log(`✅ Successfully inserted ${NUM_USERS} users!`);

    // Insert into user_role_mapping with correct user_id
    for (let i = 0; i < NUM_USERS; i++) {
      const userId = userResults.insertId + i; // Correctly reference user_id (assuming auto-increment)
      const roleId = 3; // Assuming a role, replace with dynamic value if needed
      const roleSql = `INSERT INTO user_role_mapping (user_id, role_id, createdAt, updatedAt) VALUES (?, ?, ?, ?)`;
      await connection.query(roleSql, [userId, roleId, createdAt, updatedAt]);
    }

  } catch (error) {
    console.error("❌ Error inserting users or mapping roles:", error);
  } finally {
    await connection.end(); // Close database connection
    console.log("✅ Database connection closed.");
  }
};

generateRandomUsers();
