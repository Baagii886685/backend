

//моделууд

//middleware
const MyError = require("../utils/MyError");
const asyncHandler = require("../middleware/asyncHandler");
const path = require("path");


//функцууд


//тест эхлүүлхэд нээгдэх хугацаа болсон үгүйг шалгах
const test = asyncHandler(async (req, res, next) => {
    console.log("хүсэлт ирлээ");
});

module.exports = {
test
};
