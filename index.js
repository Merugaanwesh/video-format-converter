const express = require("express");
const app = express();
const port = 3000;
const bodyparser = require("body-parser");
const UploadRouter = require("./router/uploadVideo.router");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/ffmpeg", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((error) => {
    console.error(`Error in database connection ${error.message}`);
  });
const urlSchem = require("./models/urlScheme");
app.use(bodyparser.json());
app.use(UploadRouter);
app.listen(port, (error) => {
  if (error) throw error;
  console.log(`port number ${port}server is runing...`);
});
