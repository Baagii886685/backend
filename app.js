const express = require("express");
const helmet = require("helmet");


const bodyParser = require("body-parser");

const app = express();



app.use(express.json());
var cors = require("cors");
app.use(
  cors({
    origin: "*",
    // callback(null, true);
  })
);

var Color = require("colors");

const dotenv = require("dotenv");


dotenv.config({ path: "./.env" });


process.env;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


const server = app.listen(process.env.PORT, function () {
    console.log(`Backend ${process.env.PORT} порт дээр ажиллаа`.rainbow);
  });





// process.on('unhandledRejection', (err, promise) =>{
//   console.log(`адпаа гарлаа app.js -ын process.on-д ${err.message}`);
//   server.close(() =>{
//     process.exit(0);
//   })
// })