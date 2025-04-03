var express = require("express");
var router = express.Router();
require("dotenv").config();
const upload = require("../handlers/multer");
const roleAuthentication = require("../middlewares/role-auth-middleware");
const {
  userRegister,
  userLogin,
  getAllUser,
  getUserInfo,
  assignUserRole,
  deleteUser,
  updateUser,
  updateUserWithRoles,
  getUserByCode,
  getCurrentUser,
} = require("../controller/user.controller");
const { getUserRoles } = require("../utils/userRole");

router.post("/register", upload.single("imageUrl"), userRegister);

router.post("/login", userLogin);

router.get("/currentUser", getCurrentUser);

router.get("/all-user", roleAuthentication(["ADMIN"]), getAllUser);

router.get("/userInfo/:id", getUserInfo);

router.get("/code/:code", roleAuthentication(["ADMIN"]), getUserByCode);

// router.post("/user-role-assign", roleAuthentication(["ADMIN"]), assignUserRole);

router.delete("/delete-user/:id", roleAuthentication(["ADMIN"]), deleteUser);

// router.put('/update-user/:id', roleAuthentication(['ADMIN']), updateUser)
router.put(
  "/update-user/:id",
  roleAuthentication(["ADMIN"]),
  upload.single("imageUrl"),
  updateUserWithRoles
);

module.exports = router;
