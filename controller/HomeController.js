const { MongoClient, ObjectId } = require('mongodb');
//моделууд
const users = require("../models/user");
const infoNews = require("../models/infoNews");
const borderPort = require("../models/borderPort");
const borderPortTime = require("../models/portTimeTable");
const mendchilgee = require("../models/dargiinMendchilgee");
const taniltsuulga = require("../models/alsiinKharaaZorilgo");
const baiguullagiinTuuh = require("../models/baiguullagiinTuuh");
const baiguullagiinButets = require("../models/baiguullagiinbutets");
const boomtTsagiinHuvaariNew = require("../models/boomtTsagiinHuvaariNew");

//middleware
const MyError = require("../utils/MyError");
const asyncHandler = require("../middleware/asyncHandler");
const path = require("path");
const { CLIENT_RENEG_LIMIT } = require('tls');
// const portTimeTable = require('../models/portTimeTable');


//функцууд
const medeeHarah = asyncHandler(async (req, res, next) => {
  const allNewsInfo = await infoNews.find();
  res.status(200).json({
    success: true,
    data: allNewsInfo,
  });

});
//Боомтуудын мэдээлэл харах mounted-р дуудаж байгаа
const borderInfo = asyncHandler(async (req, res, next) => {
  const allBorderPortInfo = await borderPort.find();
  // console.log("request");
  res.status(200).json({
    success: true,
    data: allBorderPortInfo,
  });
});

//цагийн хуваарь хадгалах
const portTimeSave = asyncHandler(async (req, res, next) => {
  try {
    // console.log("req.body =>", req.body);
    const tsagiinHuvaari = {
      additionalTransportation: req.body.additionalTransportation,
      portWork: req.body.portWork,
      checked: req.body.checked,
      nemeltChecked: req.body.nemeltChecked,
      nemeltAmraltiinOdor: req.body.nemeltAmraltiinOdor,
      amraltiinOdor: req.body.amraltiinOdor,
      additionTsaiEndTime: req.body.additionTsaiEndTime,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      tsaiStartTime: req.body.tsaiStartTime,
      tsaiEndTime: req.body.tsaiEndTime,
      portDescription: req.body.portDescription,
      value1: req.body.value1,
      additionName: req.body.additionName,
      additionStartTime: req.body.additionStartTime,
      additionEndTime: req.body.additionEndTime,
      additionTsaiStartTime: req.body.additionTsaiStartTime,
      checkboxGroup1: req.body.checkboxGroup1,
      checkboxGroup2: req.body.checkboxGroup2,
      createUserId: req.body.createUserId,
      borderPortId: req.body.borderPortId,
    }
    const myData = new borderPortTime(tsagiinHuvaari);
    await myData.save();
    res.status(200).json({
      success: true,
      data: "Амжилттай",
    });
  } catch (err) {
    console.log("Алдаа гарлаа", err);
  }
});

//Боомт нэмэх хадгалах аргумент цагийн хуваарьаас бусад бүх мэдээлэл орж ирнэ
const borderPortAdd = asyncHandler(async (req, res, next) => {
  const file = req.files;
  console.log("Боомт =>", req.body);
  const myArray = [];
  const value = req.body.urtrag + ", " + req.body.orgorog;
  myArray.push(value)
  console.log("value => ", value);
  file.portImage1.name = `portPhoto_${file.portImage1.md5}${path.parse(file.portImage1.name).ext}`;
  file.portImage2.name = `portPhoto_${file.portImage2.md5}${path.parse(file.portImage2.name).ext}`;
  // console.log("req.files =>", req.files);

  file.portImage1.mv(`${process.env.BORDER_PORT_UPLOAD_PATH}/${file.portImage1.name}`, (err) => {
    if (err) {
      throw new MyError(
        "файлыг хуулах явцад алдаа гарлаа. ",
        err.message,
        400
      );
    }
  });

  file.portImage2.mv(`${process.env.BORDER_PORT_UPLOAD_PATH}/${file.portImage2.name}`, (err) => {
    if (err) {
      throw new MyError(
        "файлыг хуулах явцад алдаа гарлаа. ",
        err.message,
        400
      );
    }
  });

  const borderPortData = {
    name: req.body.name,
    ognoo: req.body.ognoo,
    desc: req.body.desc,
    borderKm: req.body.borderKm,
    sumiinTovKm: req.body.sumiinTovKm,
    clanKm: req.body.clanKm,
    cityKm: req.body.cityKm,
    desc1: req.body.desc1,
    desc2: req.body.desc2,
    desc3: req.body.desc3,
    region: req.body.region,
    portImage1: `${process.env.BORDER_PORT_UPLOAD_PATH}/${file.portImage1.name}`,
    portImage2: `${process.env.BORDER_PORT_UPLOAD_PATH}/${file.portImage2.name}`,
    location: value,
    createUserId: req.body.userId,
  }
  const myData = new borderPort(borderPortData);
  await myData.save();
  res.status(200).json({
    success: true,
    data: "aмжилттай хадгалагдлаа",
  });

});

//нийтлэл устгах аргумент нь мэдээний id ирнэ
const infoDelete = asyncHandler(async (req, res, next) => {
  // console.log("req.body =>", req.body.myData);
  // const objectId = new ObjectID(req.body.myData);

  const result = await infoNews.deleteOne({ _id: req.body.myData });
  // console.log("result =>", result);
  if (result.acknowledged === true) {
    res.status(200).json({
      success: true,
      data: "Устгагдлаа",
    });
  } else {
    res.status(200).json({
      success: true,
      data: "Устгахад алдаа гарлаа",
    });
  }
});
//Боомтуудын цагийн хуваарь оруулахад боомтуудын нэрийг авна. mounted-р ажиллаж байгаа аргумент userId token
const borderPortViewNames = asyncHandler(async (req, res, next) => {
  // console.log("object", req.body);
  if (req.body.userId) {
    const allPortname = await borderPort.aggregate(
      [
        {
          $match:
            {},
        },
        {
          $project:
          {
            _id: 1,
            name: 1,
            // location: 1,
          },
        },
      ]
    );
    res.status(200).json({
      success: true,
      data: allPortname,
    });
  }
});
//Боомтын байршил болон нэр авах
const borderLocation = asyncHandler(async (req, res, next) => {
  const allBorderPortLocation = await borderPort.aggregate(
    [
      {
        $lookup:
        {
          from: "porttimetables",
          localField: "_id",
          foreignField: "borderPortId",
          as: "result",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                $arrayElemAt: ["$result", 0],
              },
              "$$ROOT",
            ],
          },
        },
      },
      {
        $lookup:
        {
          from: "boomttsagiinhuvaarinews",
          localField: "_id",
          foreignField: "isBorderPortId",
          as: "isResult",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                $arrayElemAt: ["$isResult", 0],
              },
              "$$ROOT",
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          tsagiinHuwaariTailbar: 1,
          isAdditionalTransportation: 1,
          isPortWork: 1,
          isChecked: 1,
          isNemeltChecked: 1,
          isNemeltAmraltiinOdor: 1,
          isAdditionTsaiEndTime: 1,
          isStartTime: 1,
          isEndTime: 1,
          isTsaiStartTime: 1,
          isTsaiEndTime: 1,
          isPortDescription: 1,
          isValue1: 1,
          isAdditionName: 1,
          isAdditionStartTime: 1,
          isAdditionEndTime: 1,
          isAdditionTsaiStartTime: 1,
          isCheckboxGroup1: 1,
          isCheckboxGroup2: 1,
          checked: 1,
          portWork: 1,
          nemeltChecked: 1,
          nemeltAmraltiinOdor: 1,
          amraltiinOdor: 1,
          startTime: 1,
          endTime: 1,
          tsaiStartTime: 1,
          tsaiEndTime: 1,
          portDescription: 1,
          value1: 1,
          additionName: 1,
          additionStartTime: 1,
          additionEndTime: 1,
          additionTsaiStartTime: 1,
          additionTsaiEndTime: 1,
          checkboxGroup1: 1,
          checkboxGroup2: 1,
          additionalTransportation: 1,
          name: 1,
          location: 1,
          borderKm: 1,
          desc1: 1,
          desc2: 1,
          portOgnoo: 1,
        },
      },
    ]
  );
  // console.log("request", allBorderPortLocation);
  res.status(200).json({
    success: true,
    data: allBorderPortLocation,
  });
});

//Шинэ мэдээ мэдээлэл оруулахад энэ функц дуудагдана. --мэдээний гарчиг, зураг текст бүгд орж ирнэ.
const medeeHadgalah = asyncHandler(async (req, res, next) => {
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
    infoTitle: req.body.titleText,
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
        // console.log("зөв байна");
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

  // console.log("req.body", req.body);

  let data = {
    username: req.body.username,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    // birthday: req.body.birthday,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    userType: req.body.userType,
    password: req.body.password,
  };
  // console.log("data =>", data);
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

//газрын зураг дээр байгаа боомтын байршил дээр дархад тухайн боомтын Id орж ирнэ. Тэр цагийнхуваарийг буцаана.
const portTime = asyncHandler(async (req, res, next) => {
  try {
    console.log("хүсэлт ирлээ");
    const doc = await borderPortTime.aggregate([
      {
        $match:
        {
          borderPortId: new ObjectId(req.body.myData),
        },
      },
    ]);
    // console.log("doc=>", doc);
    return res.status(200).send({
      success: true,
      data: doc,
    });
  } catch (err) {
    return res.status(500).send({
      success: true,
      data: "цагийнхуваарь олдсонгүй",
    });
  }
});

//Мэндчилгээ хадгалах
const mendchilgeeHadgalah = asyncHandler(async (req, res, next) => {
  const file = req.files;
  // console.log("this.file", req.files);
  file.photo.name = `dargaPhoto_${file.photo.md5}${path.parse(file.photo.name).ext}`;
  // console.log("req.files =>", req.files);

  file.photo.mv(`${process.env.DARGA_PHOTO_UPLOAD_PATH}/${file.photo.name}`, (err) => {
    if (err) {
      throw new MyError(
        "файлыг хуулах явцад алдаа гарлаа. ",
        err.message,
        400
      );
    }
  });

  const datgaMendchilgee = {
    textarea1: req.body.textarea1,
    textarea2: req.body.textarea2,
    textarea3: req.body.textarea3,
    textarea4: req.body.textarea4,
    textarea5: req.body.textarea5,
    input1: req.body.input1,
    input2: req.body.input2,
    photo: `${process.env.DARGA_PHOTO_UPLOAD_PATH}/${file.photo.name}`,
    createUserId: req.body.userId,
  }
  const myData = new mendchilgee(datgaMendchilgee);
  await myData.save();
  res.status(200).json({
    success: true,
    data: "aмжилттай хадгалагдлаа",
  });
});

//Даргын мэндчилгээ харах
const dargaMendchilgee = asyncHandler(async (req, res, next) => {
  try {
    // Assuming mendchilgee is a Mongoose model
    const docs = await mendchilgee.find({}); // Finding all documents

    res.status(200).json({
      success: true,
      data: docs,
    });
  } catch (error) {
    // Handle errors appropriately
    next(error);
  }
});

//алсын хараа хадгалах
const taniltsuulgaHadgalah = asyncHandler(async (req, res, next) => {
  // console.log("req.body =>", req.body);
  try {
    const myDataa = {
      name: req.body.alsiinKharaa,
      text1: req.body.alsiinKharaa1,
      text2: req.body.alsiinKharaa2,
      text3: req.body.alsiinKharaa3,
      text4: req.body.alsiinKharaa4,
      text5: req.body.alsiinKharaa5,
      createUserId: req.body.userId,
    }
    const myData = new taniltsuulga(myDataa);
    await myData.save();
    res.status(200).json({
      success: true,
      data: "aмжилттай хадгаллаа",
    });
  } catch (err) {
    console.log("Алдаа гарлаа");
  }
});

//Танилцуулга цэс рүү орход харуулах мэдээллийг татна.
const taniltsuulgaView = asyncHandler(async (req, res, next) => {
  try {
    // Assuming mendchilgee is a Mongoose model
    const docs = await taniltsuulga.find({}); // Finding all documents

    res.status(200).json({
      success: true,
      data: docs,
    });
  } catch (error) {
    // Handle errors appropriately
    next(error);
  }
});

const baiguullagaTuuhHadgalah = asyncHandler(async (req, res, next) => {
  const tuuh = {
    text1: req.body.text1,
    togtoolLink: req.body.togtoolLink,
    togtoolDugaar: req.body.togtoolDugaar,
    text2: req.body.text2,
    createUserId: req.body.userId,
  }
  const myData = new baiguullagiinTuuh(tuuh);
  await myData.save();
  res.status(200).json({
    success: true,
    data: "aмжилттай хадгалагдлаа",
  });
});

const tuuhHaruulah = asyncHandler(async (req, res, next) => {
  try {
    // Assuming mendchilgee is a Mongoose model
    const docs = await baiguullagiinTuuh.find({}); // Finding all documents

    res.status(200).json({
      success: true,
      data: docs,
    });
  } catch (error) {
    // Handle errors appropriately
    next(error);
  }
});
//Байгууллагын түүх хадгална.
const tuuhustgah = asyncHandler(async (req, res, next) => {
  console.log("object =>", req.body.id);
  const result = await baiguullagiinTuuh.deleteOne({ _id: req.body.id });
  // console.log("result =>", result);
  if (result.acknowledged === true) {
    res.status(200).json({
      success: true,
      data: "Устгагдлаа",
    });
  } else {
    res.status(200).json({
      success: true,
      data: "Устгахад алдаа гарлаа",
    });
  }
});

//Байгууллагын бүтэц хадгална аргумент зураг текст хэрэглэгчийн id орж ирнэ
const butetsHadgalah = asyncHandler(async (req, res, next) => {
  try {
    const file = req.files;
    console.log("req.body=>", req.body);
    //Ирсэн зургын нэрийг өөрчлөх
    file.fileOne.name = `butetsPhoto_${file.fileOne.md5}${path.parse(file.fileOne.name).ext}`;
    //Зургыг public folder ийн infoPhoto руу зөөх 
    file.fileOne.mv(`${process.env.BUTETS_UPLOAD_PATH}/${file.fileOne.name}`, (err) => {
      if (err) {
        throw new MyError(
          "файлыг хуулах явцад алдаа гарлаа. ",
          err.message,
          400
        );
      }
    });

    const butetsData = {
      photoOne: `${process.env.BUTETS_UPLOAD_PATH}/${file.fileOne.name}`,
      createUserId: req.body.userId,
      description: req.body.textarea,
    }
    const myData = new baiguullagiinButets(butetsData);
    await myData.save();
    res.status(200).json({
      success: true,
      data: "aмжилттай хадгалагдлаа",
    });
  } catch (error) {
    console.log("Алгаа", error);
  }
});

//байгуулагын бүтэц хэсэг рүү орход энэ функцийг дуудна.
const butetsHaray = asyncHandler(async (req, res, next) => {
  try {
    // Assuming mendchilgee is a Mongoose model
    const docs = await baiguullagiinButets.find({}); // Finding all documents

    res.status(200).json({
      success: true,
      data: docs,
    });
  } catch (error) {
    // Handle errors appropriately
    next(error);
  }
});

//Даргын мэндчилгээ устгах
const mendchilgeeUstgah = asyncHandler(async (req, res, next) => {
  try {
    console.log("object=>", req.body.id);
    const result = await mendchilgee.deleteOne({ _id: req.body.id });
    if (result.acknowledged === true) {
      res.status(200).json({
        success: true,
        data: "Устгагдлаа",
      });
    } else {
      res.status(200).json({
        success: true,
        data: "Устгахад алдаа гарлаа",
      });
    }
  } catch (error) {
    next(error);
  }

});

// цагийнхуваарьын өөрчлөлт хадгалах
const isPortTimeSave = asyncHandler(async (req, res, next) => {

  try {
    console.log("req.body =>", req.body);
    const tsagiinHuvaariNew = {
      tsagiinHuwaariTailbar: req.body.tsagiinHuwaariTailbar,
      isAdditionalTransportation: req.body.additionalTransportation,
      isPortWork: req.body.portWork,
      isChecked: req.body.checked,
      isNemeltChecked: req.body.nemeltChecked,
      isNemeltAmraltiinOdor: req.body.nemeltAmraltiinOdor,
      isAmraltiinOdor: req.body.amraltiinOdor,
      isAdditionTsaiEndTime: req.body.additionTsaiEndTime,
      isStartTime: req.body.startTime,
      isEndTime: req.body.endTime,
      isTsaiStartTime: req.body.tsaiStartTime,
      isTsaiEndTime: req.body.tsaiEndTime,
      isPortDescription: req.body.portDescription,
      isValue1: req.body.value1,
      isAdditionName: req.body.additionName,
      isAdditionStartTime: req.body.additionStartTime,
      isAdditionEndTime: req.body.additionEndTime,
      isAdditionTsaiStartTime: req.body.additionTsaiStartTime,
      isCheckboxGroup1: req.body.checkboxGroup1,
      isCheckboxGroup2: req.body.checkboxGroup2,
      isCreateUserId: req.body.createUserId,
      isBorderPortId: req.body.borderPortId,
    }
    const myData = new boomtTsagiinHuvaariNew(tsagiinHuvaariNew);
    await myData.save();
    res.status(200).json({
      success: true,
      data: "Амжилттай",
    });
  } catch (err) {
    console.log("Алдаа гарлаа", err);
  }

});


// Боомт устгах
const borderPortDelete = asyncHandler(async (req, res, next) =>{
  try {
    // console.log("object=>", req.body);
    const value = await boomtTsagiinHuvaariNew.deleteMany({ isBorderPortId: req.body.portId });
    // console.log("value =>", value.acknowledged);
    const timesDelete = await borderPortTime.deleteMany({ borderPortId: req.body.portId});
    // console.log("timesDelete =>", timesDelete.acknowledged);
    const result = await borderPort.deleteOne({ _id: req.body.portId });
    if (result.acknowledged === true && value.acknowledged === true && timesDelete.acknowledged  === true) {
      res.status(200).json({
        success: true,
        data: "Устгагдлаа",
      });
    } else {
      res.status(200).json({
        success: true,
        data: "Устгахад алдаа гарлаа",
      });
    }
  } catch (error) {
    next(error);
  }
});
// Боомтын үндсэн цагын хуваарь харах боомтын id орж ирнэ тэр id-р хайж олоод цагийн хуваарь буцаана.
const portMainTimeView =  asyncHandler(async (req, res, next) =>{
  try{
    const docs = await borderPortTime.find({ borderPortId: req.body.portId});
    // console.log("docs =>", docs);
    if(docs){
      res.status(200).json({
        success: true,
        data: docs,
      });
    }
  }catch(error){
    console.log("алдаа гарлаа", error);
  }
});

// Боомтын үндсэн цагийн хуваарь устгах
const borderPortTimeDelete = asyncHandler(async (req, res, next) =>{
  try {
    const result = await borderPortTime.deleteMany({ _id: req.body.myId });
    if (result) {
      res.status(200).json({
        success: true,
        data: "Цагийн хуваарьыг устаглаа.",
      });
    } else {
      res.status(200).json({
        success: true,
        data: "Устгахад алдаа гарлаа",
      });
    }
  } catch (error) {
    next(error);
  }
});

const portaddTimeDelete = asyncHandler(async (req, res, next) =>{
  try {
    const result = await boomtTsagiinHuvaariNew.deleteMany({ _id: req.body.myId });
    if (result) {
      res.status(200).json({
        success: true,
        data: "Цагийн хуваарийг устаглаа.",
      });
    } else {
      res.status(200).json({
        success: true,
        data: "Устгахад алдаа гарлаа",
      });
    }
  } catch (error) {
    next(error);
  }
});

const borderPortNewTimes = asyncHandler(async (req, res, next) =>{
  try{
    // console.log("req.body =>", req.body);
    const docs = await boomtTsagiinHuvaariNew.find({ isBorderPortId: req.body.portId});
    // console.log("docs =>", docs);
    if(docs){
      res.status(200).json({
        success: true,
        data: docs,
      });
    }
  }catch(error){
    console.log("алдаа гарлаа", error);
  }
});
module.exports = {
  portaddTimeDelete,
  borderPortNewTimes,
  borderPortDelete,
  portMainTimeView,
  isPortTimeSave,
  tuuhHaruulah,
  dargaMendchilgee,
  mendchilgeeHadgalah,
  login,
  userRegister,
  medeeHadgalah,
  medeeHarah,
  infoDelete,
  borderPortAdd,
  borderInfo,
  borderLocation,
  borderPortViewNames,
  portTimeSave,
  portTime,
  taniltsuulgaHadgalah,
  taniltsuulgaView,
  baiguullagaTuuhHadgalah,
  tuuhustgah,
  butetsHadgalah,
  butetsHaray,
  mendchilgeeUstgah,
  borderPortTimeDelete,
};
