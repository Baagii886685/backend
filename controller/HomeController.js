const { MongoClient, ObjectID } = require('mongodb');
//моделууд
const users = require("../models/user");
const infoNews = require("../models/infoNews");

//middleware
const MyError = require("../utils/MyError");
const asyncHandler = require("../middleware/asyncHandler");
const path = require("path");


//функцууд
 const medeeHarah = asyncHandler(async (req, res, next) => {
  const allNewsInfo = await infoNews.find();
  res.status(200).json({
    success: true,
    data: allNewsInfo,
  });

});

//нийтлэл устгах аргумент нь мэдээний id ирнэ
const infoDelete = asyncHandler(async (req, res, next) => {
  console.log("req.body =>", req.body.myData);
  // const objectId = new ObjectID(req.body.myData);

  const result = await infoNews.deleteOne({ _id: req.body.myData });
  console.log("result =>", result);
  if(result.acknowledged===true){
    res.status(200).json({
      success: true,
      data: "Устгагдлаа",
    });
  }else {
    res.status(200).json({
      success: true,
      data: "Устгахад алдаа гарлаа",
    });
  }
})

//Шинэ мэдээ мэдээлэл оруулахад энэ функц дуудагдана. --мэдээний гарчиг, зураг текст бүгд орж ирнэ.
 const medeeHadgalah = asyncHandler(async (req, res, next) =>{
   const file = req.files;
   console.log("req.body=>", req.body);
   //Ирсэн зургын нэрийг өөрчлөх
   file.fileOne.name = `infoPhoto_${file.fileOne.md5}${path.parse(file.fileOne.name).ext}`;
   file.fileTwo.name = `infoPhoto_${file.fileTwo.md5}${path.parse(file.fileTwo.name).ext}`;
 //Зургыг public folder ийн infoPhoto руу зөөх 
   file.fileOne.mv(`${process.env.INFO_PHOTO_UPLOAD_PATH}/${file.fileOne.name}`, (err) => {
    if (err) {
      throw new MyError(
        "файлыг хуулах явцад алдаа гарлаа. ",
        err.message,
        400
      );
    }
  });
   file.fileTwo.mv(`${process.env.INFO_PHOTO_UPLOAD_PATH}/${file.fileTwo.name}`, (err) => {
    if (err) {
      throw new MyError(
        "файлыг хуулах явцад алдаа гарлаа. ",
        err.message,
        400
      );
    }
  });
  const infoNewsData = {
    infoTitle : req.body.titleText,
    textOne: req.body.textarea1,
    photoOne: `${process.env.INFO_PHOTO_UPLOAD_PATH}/${file.fileOne.name}`,
    textTwo: req.body.textarea2,
    photoTwo: `${process.env.INFO_PHOTO_UPLOAD_PATH}/${file.fileTwo.name}`,
    textThree: req.body.textarea3,
    createUserId: req.body.userId,
  }
  const myData = new infoNews(infoNewsData);
  await myData.save();
  res.status(200).json({
    success: true,
    data: "aмжилттай хадгалагдлаа",
  });
 });

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

login,
userRegister,
medeeHadgalah,
medeeHarah,
infoDelete,
};
