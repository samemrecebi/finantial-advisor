import express from 'express';
import jwt from 'jsonwebtoken';
import postgresClient from '../config/db.js';
import authenticateToken from '../Middleware/auth.js';


const JWT_SECRET = 'interntech_token'


const router = express.Router();

//login API
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const text = "SELECT * FROM users WHERE username = $1 AND password = $2";
        const values = [username,password];

        const { rows } = await postgresClient.query(text, values);

        if (!rows.length) {
            console.log("Check username or password or user not found.");
            return res.status(404).json({ message: "Check username or password or user not found." });
        }
        const token = jwt.sign({ username: username, password: password }, JWT_SECRET, { expiresIn: '1h' });
        console.log("Authentication Successful.");
        return res.status(200).json({ message: "Authentication Successful.", token });

    } catch (error) {
        console.log("Error occurred", error.message);
        return res.status(400).json({ message: error.message });
    }
});



// Register API
router.post('/register', async (req, res) => {
    try {
        const { username, password, first_name, last_name } = req.body;

        // Check if the username already exists
        const checkUserText = "SELECT * FROM users WHERE username = $1";
        const checkUserValues = [username];
        const { rows: existingUserRows } = await postgresClient.query(checkUserText, checkUserValues);

        if (existingUserRows.length) {
            console.log("Username already exists.");
            return res.status(400).json({ message: "Username already exists." });
        }

        // Insert the new user
        const insertText = "INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4)";
        const insertValues = [username, password, first_name, last_name];
        await postgresClient.query(insertText, insertValues);

        console.log("Registration Successful.");
        return res.status(201).json({ message: "Registration Successful." });

    } catch (error) {
        console.log("Error occurred", error.message);
        return res.status(400).json({ message: error.message });
    }
});



// Update User API
router.put('/update', authenticateToken, async (req, res) => {
    try {
        const { username, password, first_name, last_name, risk_degree} = req.body;

        if (!username) {
            return res.status(400).json({ message: "Username is required." });
        }

        if (!password && !first_name && !last_name) {
            return res.status(400).json({ message: "No valid field to update provided." });
        }

        const fields = [];
        const values = [];
        let index = 1;

        if (password) {
            fields.push(`password = $${index++}`);
            values.push(password);
        }
        if (first_name) {
            fields.push(`first_name = $${index++}`);
            values.push(first_name);
        }
        if (last_name) {
            fields.push(`last_name = $${index++}`);
            values.push(last_name);
        }
        if (risk_degree) {
            fields.push(`risk_degree = $${index++}`);
            values.push(risk_degree);
        }

        values.push(username); // Push username as the last value for WHERE clause

        const updateText = `UPDATE users SET ${fields.join(', ')} WHERE username = $${index}`;

        await postgresClient.query(updateText, values);
        console.log("Update Successful.");
        return res.status(200).json({ message: "Update Successful." });

    } catch (error) {
        console.log("Error occurred", error.message);
        return res.status(400).json({ message: error.message });
    }
});

router.post('/getUserDetails', async (req, res) => {
    try {
        const { username } = req.body;
        const text = "SELECT * FROM users WHERE username = $1";
        const values = [username];

        const { rows } = await postgresClient.query(text, values);

        if (!rows.length) {
            console.log("User not found.");
            return res.status(404).json({ message: "User not found." });
        }

        console.log("User details retrieved successfully.");
        return res.status(200).json(rows[0]);

    } catch (error) {
        console.log("Error occurred", error.message);
        return res.status(400).json({ message: error.message });
    }
});






export default router;