import express from 'express';
import postgresClient from './config/db.js';
import authenticateToken from './Middleware/auth.js';
import currrenciesRouter from './controllers/CurrencyController.js';
import users from './controllers/Users.js'
import stockRouter from './controllers/StockController.js';
import chatRouter from './controllers/chat.js';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

//API routes
app.use('/api/users', users)
app.use('/api/currencies',authenticateToken, currrenciesRouter);
app.use('/api/stocks',authenticateToken, stockRouter);
app.use('/api/chat', chatRouter);



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


// Start the Express server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});