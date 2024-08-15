const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('MySQL connected');
});

// Fetch banner details
app.get('/api/banner', (req, res) => {
    console.log("Fetching banner details...");
    db.query('SELECT * FROM banner WHERE id = 1', (err, results) => {
        if (err) {
            console.error('Error fetching banner:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send(results[0]);
    });
});

// Update banner details
app.post('/api/banner', (req, res) => {
    const { description, targetDate, link, isVisible } = req.body;
    
    db.query(
        'UPDATE banner SET description = ?, targetDate = ?, link = ?, isVisible = ? WHERE id = 1', 
        [description, targetDate, link, isVisible], 
        (err, result) => {
            if (err) {
                console.error('Error updating banner:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.send({ message: 'Banner updated successfully' });
        }
    );
});

// Start the server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
