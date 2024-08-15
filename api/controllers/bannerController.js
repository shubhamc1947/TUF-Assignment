const Banner = require('../models/banner');

// Fetch banner details
exports.getBanner = async (req, res) => {
    try {
        console.log("Fetching banner details...");
        const banner = await Banner.findOne(); 
        if (banner) {
            res.send(banner);
        } else {
            res.status(404).send('Banner not found');
        }
    } catch (err) {
        console.error('Error fetching banner:', err);
        res.status(500).send('Internal Server Error');
    }
};

// Update banner details
exports.updateBanner = async (req, res) => {
    const { description, targetDate, link, isVisible } = req.body;

    try {
        const result = await Banner.updateOne({}, {
            description, 
            targetDate, 
            link, 
            isVisible
        }, { upsert: true }); 

        if (result.nModified === 0 && result.upsertedCount === 0) {
            res.status(404).send('No document updated');
        } else {
            res.send({ message: 'Banner updated successfully' });
        }
    } catch (err) {
        console.error('Error updating banner:', err);
        res.status(500).send('Internal Server Error');
    }
};
