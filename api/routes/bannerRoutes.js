const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');

router.get('/', bannerController.getBanner);
router.post('/', bannerController.updateBanner);

module.exports = router;
