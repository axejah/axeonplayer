const express = require('express');
const router = express.Router();

const videoController = require('../controllers/video');

router.get('/', videoController.getIndexPage);
router.get('/playVideo/:uuid', videoController.getPlayVideo);
router.post('/uploadVideo', videoController.postNewVideo);

module.exports = router;
