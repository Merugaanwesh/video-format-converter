const urlSchema = require("../models/urlScheme");
const ffmpeg = require("../ffmpeg/ffmpegVideo");
let uploadVideo = async (req, res) => {
  try {
    let file = req.file;
    let path = await ffmpeg.transcodeVideo(file.filename, file.path);
    let paths = {
      urlSID: Date.now(),
      originalUrl: file.path,
      imageUrl: path.imagePath,
      transcodeVideo: path.path,
    };
    await new urlSchema(paths)
      .save()
      .then(() => {
        res
          .status(200)
          .json({ message: "video  conversion successfully completed" });
      })
      .catch((err) => {
        res.status(400).json({ data: "", status: false, message: err });
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "500 internal server error", error: error.message });
  }
};

module.exports = { uploadVideo: uploadVideo };
