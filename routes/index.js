const express = require("express"); //import express
const router = express.Router();

const {
test,
login,
userRegister
} = require("../controller/HomeController");
// const { userAdd } = require("../controller/usersController");

router.route("/login").post(login);
router.route("/login1").post(userRegister);

module.exports = router;
