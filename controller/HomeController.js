//моделууд
const users = require("../models/user");


//middleware
const MyError = require("../utils/MyError");
const asyncHandler = require("../middleware/asyncHandler");
const path = require("path");


//функцууд
 const test = asyncHandler(async (req, res, next) => {
    console.log("хүсэлт ирлээ");
    console.log("data =>", req.body);
});
// const login = asyncHandler(async (req, res, next) => {
//     console.log("login функц-д хүсэлт ирлээ");
//     console.log("data =>", req.body);
// });


// Хэрэглэгч нэвтрэх
const login = asyncHandler(async (req, res, next) => {
  // console.log("req.body :", req.body);
  const { username, password } = req.body;
  //оролтыг шалгана
  if (!username || !password) {
    throw new MyError("email болон нууц үг оруулна уу", 400);
  } else if (username && password) {
    const user = await users.findOne({ username }).select("+password");
    // console.log("object =>", user);
    if (user) {
      const ok = await user.checkPassword(password);
      if (!user || !ok) {
        res.status(200).json({
          success: true,
          message: "Нэвтрэх нэр эсвэл нууц үг буруу байна",
        });
      } else {
        console.log("зөв байна");
        const token = user.getJsonWebToken();
        // console.log("token =>", token);
        // console.log("user : ", user);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
          success: true,
          userType: user.userType,
          token: token,
          name: user.firstName,
          userName: user.username,
          id: user._id,
        });
      }
    } else {
      res.status(200).json({
        success: true,
        message: "Нэвтрэх нэр эсвэл нууц үг буруу байна",
      });
    }
  }

  //тухайн хэрэглэгчийг хайна
  // console.log("object: ", user);

  // if(!ok){
  //     throw new MyError("email эсвэл нууц үг буруу байна", 401);
  // }
  // console.log("torol : ", user.torol);
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
    console.log("req.body", req.body);
 
    let data = {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: req.body.password,
    };
    console.log("data =>", data);
    const myData = new users(data);
    const result = await myData.save();
    const token = result.getJsonWebToken();
    res.status(200).json({
      success: true,
      token,
      data: "aмжилттай бүртгэгдлээ",
      code: result.username,
    });
  });
module.exports = {
test,
login,
userRegister
};
