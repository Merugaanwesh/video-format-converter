//const path = require("path");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const transcodeVideo = async (filename, filepath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(filepath)
      .videoCodec("libx264")
      .audioCodec("libmp3lame")
      .size("720x?")
      .on("error", function (err) {
        reject(err);
      })
      .on("end", function () {
        ffmpeg(filepath)
          .screenshots({
            timestamps: ["10%"],
            folder: "./uploads",
            filename: `${filename}.mp4.png`,
            size: "720x?",
          })
          .on("error", function (err) {
            reject(err);
          })
          .on("end", function () {
            resolve({
              path: `./uploads/${filename}.mp4`,
              imagePath: `./uploads/${filename}.mp4.png`,
            });
          });
      })
      .save(`./uploads/${filename}.mp4`);
  });
};

module.exports = { transcodeVideo };