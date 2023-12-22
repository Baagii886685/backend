const express = require("express"); //import express
const router = express.Router();

const {
test
} = require("../controller/HomeController");
// const { userAdd } = require("../controller/usersController");

router.route("/login").post(test);

module.exports = router;
