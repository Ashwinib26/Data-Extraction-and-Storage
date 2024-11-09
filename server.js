const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Pool } = require('pg'); 
app.use(bodyParser.json());

const pool = new Pool({
    user: 'your_username',
    host: 'your_host',
    database: 'database_name',
    password: 'your_password',
    port: 5432,
});

app.post('/save-user-data', (req, res) => {
    const { name, email, choice } = req.body;

    const query = 'INSERT INTO user_data (name, email, choice) VALUES ($1, $2, $3)';
    const values = [name, email, choice];

    pool.query(query, values, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json({ message: 'User data stored successfully' });
    });
    pool.connect((err, client, release) => {
        if (err) {
            console.error('Error acquiring client', err.stack);
        } else {
            console.log('PostgreSQL connected successfully');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
