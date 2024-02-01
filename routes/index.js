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
    baiguullagaTuuhHadgalah,
    tuuhHaruulah,
    tuuhustgah,
    butetsHadgalah,
    butetsHaray,
    mendchilgeeUstgah,
    isPortTimeSave,
    borderPortDelete,
    portMainTimeView,
    borderPortTimeDelete,
    borderPortNewTimes,
    portaddTimeDelete,
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
router.route("/butetsHaray").post(butetsHaray);


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
router.route("/tuuhHadgalah").post(baiguullagaTuuhHadgalah);
router.route("/tuuhHaruulah").post(tuuhHaruulah);
router.route("/tuuhustgah").post(tuuhustgah);
router.route("/butetsHadgalah").post(butetsHadgalah);
router.route("/mendchilgeeUstgah").post(mendchilgeeUstgah);
router.route("/isPortTimeSave").post(isPortTimeSave);
router.route("/borderPortDelete").post(borderPortDelete);
router.route("/portMainTimeView").post(portMainTimeView);
router.route("/borderPortTimeDelete").post(borderPortTimeDelete);
router.route("/borderPortNewTimes").post(borderPortNewTimes);
router.route("/PortaddTimeDelete").post(portaddTimeDelete);


module.exports = router;
