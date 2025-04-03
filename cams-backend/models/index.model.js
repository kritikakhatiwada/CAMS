const sequelize = require("../config/db-connection.config");
const User = require("./User.model");
const Role = require("./role-model");
const UserRoleMapping = require("./user-role-mapping");

const ConnectToDatabase = async () => {
  await sequelize.authenticate(),
    await sequelize.sync({
      alter: true,
    });
};

module.exports = {
  User,
  Role,
  UserRoleMapping,
  ConnectToDatabase,
};
