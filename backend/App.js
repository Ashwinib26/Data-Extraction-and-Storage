const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const { Pool } = require('pg');

const app = express();

app.use(cors()); 
app.use(bodyParser.json());

const pool = new Pool({
    user: 'your_username',
    host: 'your_host',
    database: 'database_name',
    password: 'your_password',
    port: 5432,
});

pool.connect((err) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err);
    } else {
        console.log('Connected to PostgreSQL successfully!');
    }
});

app.post('/api/user', async (req, res) => {
    const { name, email, choice, clicks } = req.body;

    try {
        await pool.query(
            'INSERT INTO user_data (name, email, choice, clicks) VALUES ($1, $2, $3, $4)',
            [name, email, choice, clicks]
        );
        res.json({ message: 'User data stored successfully' });
    } catch (err) {
        console.error('Error saving user data:', err);
        res.status(500).json({ message: 'Error saving user data' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
