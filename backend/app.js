import express from 'express';

import postgresClient from './src/config/db.js';

import authenticateToken from './src/Middleware/auth.js';


const app = express();
app.use(express.json())

// Function to test the database connection
const checkDbConnection = async () => {
    try {
        // Perform a simple query to test the connection
        const res = await postgresClient.query('SELECT 1');

        // If the query is successful, the connection is established
        console.log('Database connection established successfully:', res.rows[0]);

        // Return true to indicate success
        return true;
    } catch (err) {
        // Handle any errors
        console.error('Error connecting to the database:', err);

        // Return false to indicate failure
        return false;
    }
};

// Call the function to check the database connection
checkDbConnection().then(success => {
    if (success) {
        console.log('Connection to the database was successful.');
    } else {
        console.log('Failed to connect to the database.');
    }
});


// Start the Express server (assuming you have additional app setup code below)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});