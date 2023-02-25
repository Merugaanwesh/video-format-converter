const express = require("express");
const Router = express.Router();
const controller = require("../controller/uploadVideo.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
Router.post("/api/uploadVideo", upload.single("file"), controller.uploadVideo);

module.exports = Router;
