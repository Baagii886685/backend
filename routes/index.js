const express = require("express"); //import express
const router = express.Router();

const {
medeeHarah,
login,
userRegister,
medeeHadgalah,
infoDelete,
borderPortAdd,
borderInfo,
borderLocation,
borderPortViewNames,
portTimeSave,
// borderPortTimeView,
portTime, 
mendchilgeeHadgalah,
dargaMendchilgee,
taniltsuulgaHadgalah,
taniltsuulgaView,
} = require("../controller/HomeController");
// const { userAdd } = require("../controller/usersController");
//mounted
router.route("/infoNews").post(medeeHarah);
router.route("/borderPortView").post(borderInfo);
router.route("/borderLocation").post(borderLocation);
router.route("/borderPortViewNames").post(borderPortViewNames);
// router.route("/borderPortTime").post(borderPortTimeView);
router.route("/dargaMendchilgee").post(dargaMendchilgee);
router.route("/taniltsuulgaView").post(taniltsuulgaView);


//click
router.route("/login").post(login);
router.route("/createuser").post(userRegister);
router.route("/medeeHadgalah").post(medeeHadgalah);
router.route("/portTimeSave").post(portTimeSave);
router.route("/portTime").post(portTime);
router.route("/mendchilgeeHadgalah").post(mendchilgeeHadgalah);

router.route("/infoDelete").post(infoDelete);
router.route("/borderPortAdd").post(borderPortAdd);
router.route("/taniltsuulgaHadgalah").post(taniltsuulgaHadgalah);


module.exports = router;
