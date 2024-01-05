const express = require("express"); //import express
const router = express.Router();

const {
medeeHarah,
login,
userRegister,
medeeHadgalah
} = require("../controller/HomeController");
// const { userAdd } = require("../controller/usersController");

router.route("/login").post(login);
router.route("/login1").post(userRegister);
router.route("/medeeHadgalah").post(medeeHadgalah);
router.route("/infoNews").post(medeeHarah);

module.exports = router;
