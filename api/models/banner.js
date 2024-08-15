const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    description: String,
    targetDate: Date,
    link: String,
    isVisible: Boolean
}, { collection: 'banner' }); // Ensure correct collection name

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
