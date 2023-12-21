const express = require("express");
const helmet = require("helmet");


const bodyParser = require("body-parser");

const app = express();



app.use(express.json());
var cors = require("cors");
app.use(
  cors({
    origin: "*",
    // callback(null, true);asdfasdfsdfasdfasdfasdfasdf
  })
);

var Color = require("colors");

const dotenv = require("dotenv");


dotenv.config({ path: "./config/config.env" });


process.env;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const connectDB = require("./config/db");
connectDB();
const server = app.listen(process.env.PORT, function () {
    console.log(`Backend ${process.env.PORT} порт дээр ажиллаа`.rainbow);
  });





// process.on('unhandledRejection', (err, promise) =>{
//   console.log(`адпаа гарлаа app.js -ын process.on-д ${err.message}`);
//   server.close(() =>{
//     process.exit(0);
//   })
// })