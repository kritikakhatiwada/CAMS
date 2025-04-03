"use strict";

const User = require("../models/User.model");
const Role = require("../models/role-model");
const bcrypt = require("bcryptjs");
require("dotenv").config();

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPassword = await bcrypt.hash(
      process.env.SEEDER_ADMIN_PASSWORD,
      10
    );

    console.log("Inserting admin user...");
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: process.env.SEEDER_ADMIN_NAME,
          email: process.env.SEEDER_ADMIN_EMAIL,
          password: hashPassword,
          address: process.env.SEEDER_ADMIN_ADDRESS,
          phone: process.env.SEEDER_ADMIN_CONTACT,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    console.log("Admin user inserted.");

    // Check all users after insertion
    const allUsers = await User.findAll();
    console.log("All users in database:", allUsers);

    console.log("Fetching admin user...");
    const adminUser = await User.findOne({
      where: { name: process.env.SEEDER_ADMIN_NAME },
      attributes: ["id"],
    });
    console.log("Fetched admin user:", adminUser);

    if (!adminUser) {
      throw new Error("Admin user not found after insertion.");
    }

    console.log("Inserting roles...");
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          name: "admin",
          code: process.env.SEEDER_ADMIN_CODE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "college",
          code: process.env.SEEDER_COLLEGE_CODE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "student",
          code: process.env.SEEDER_STUDENT_CODE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    console.log("Roles inserted.");

    console.log("Fetching admin role...");
    const adminRole = await Role.findOne({
      where: { name: "admin" },
      attributes: ["id"],
    });
    console.log("Fetched admin role:", adminRole);

    if (!adminRole) {
      throw new Error("Admin role not found after insertion.");
    }

    console.log("Inserting user-role mapping...");
    await queryInterface.bulkInsert(
      "user_role_mapping",
      [
        {
          user_id: adminUser.id,
          role_id: adminRole.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    console.log("User-role mapping inserted.");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_role_mapping", null, {});
    await queryInterface.bulkDelete("roles", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};

 