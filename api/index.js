const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bannerRoutes = require('./routes/bannerRoutes');
const connectDB = require('./config/db');

dotenv.config();
//Database connection function
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use('/api/banner', bannerRoutes);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
