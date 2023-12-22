//моделууд
const user = require("../models/user");


//middleware
const MyError = require("../utils/MyError");
const asyncHandler = require("../middleware/asyncHandler");
const path = require("path");


//функцууд
 const test = asyncHandler(async (req, res, next) => {
    console.log("хүсэлт ирлээ");
});
const login = asyncHandler(async (req, res, next) => {
    console.log("login функц-д хүсэлт ирлээ");
    console.log("data =>", req.body);
});


//хэрэглэгч бүртгэх
const userRegister = asyncHandler(async (req, res, next) => {
    // const date = new Date();
    // const year = date.getFullYear().toString().substring(2, 4);
    // const randomNumber = randomize("0", 7).toString();
    //хэрэглэгч бүртгүүлхэд дурын тоо үүсгээд А гаар эхэлсэн код олгож байна нэвтрэхдээ ашиглах
    // const useg = "A";
    // const userCode = useg.concat(year).concat(randomNumber);
    // console.log("  code => :", userCode);
    // console.log("req.body", req.body);
 
    let data = {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: req.body.password,
    };
    const myData = new user(data);
    const result = await myData.save();
    const token = result.getJsonWebToken();
    res.status(200).json({
      success: true,
      token,
      data: "aмжилттай бүртгэгдлээ",
      code: result.userCode,
    });
  });
module.exports = {
test,
login,
userRegister
};
