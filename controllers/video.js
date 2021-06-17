const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const { v4 } = require('uuid');
const Video = require('../models/Video');

exports.getIndexPage = async (req, res) => {
  const latestVideos = await Video.find().sort({ _id: -1 }).limit(5);
  return res.render('index', { latestVideos });
};

exports.getPlayVideo = async (req, res) => {
  const { uuid } = req.params;
  const video = await Video.find({ uuid });
  console.log(video);
  await res.render('videoplayer', {
    title: video[0].title,
    filename: video[0].filename,
  });
};

exports.postNewVideo = (req, res) => {
  const form = new formidable.IncomingForm();
  const regex = /\.(webm|avi|mp4)$/i;

  form.parse(req, (err, fields, files) => {
    if (!files.video.name.match(regex)) {
      return res.render('index'); // add error message to show allowed file ext
    }
    const oldPath = files.video.path;
    const title = fields.title;

    const fileExt = files.video.name.split('.').pop();
    const uid = v4();
    const newFileName = `${uid}.${fileExt}`;

    const newPath = path.join(__dirname, `../public/videos/${newFileName}`);
    const rawData = fs.readFileSync(oldPath);

    fs.writeFile(newPath, rawData, async (err) => {
      if (err) console.log(err);

      const newVideo = await Video.create({
        title,
        uuid: uid,
        filename: newFileName,
      });

      return await res.redirect(`/playVideo/${newVideo.uuid}`);
    });
  });
};
