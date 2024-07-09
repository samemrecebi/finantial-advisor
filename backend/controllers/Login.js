import express from 'express';
import jwt from 'jsonwebtoken';
import postgresClient from '../config/db.js';
import authenticateToken from '../Middleware/auth.js';


const JWT_SECRET = 'interntech_token'


const router = express.Router();


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const text = "SELECT * FROM login WHERE username = $1 AND password = $2";
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



//test for the authentication
router.get('/allusers', authenticateToken, async (req, res) => {
    try {
        const text = "SELECT * FROM login";
        const values = [req.user.username, req.user.password];
        const { rows } = await postgresClient.query(text);
        return res.status(200).json(rows);
    } catch (error) {
        console.log("Error occurred", error.message);
        return res.status(400).json({ message: error.message });
    }
});


export default router;
