import express from 'express';
import postgresClient from '../config/db.js';
import authenticateToken from '../Middleware/auth.js';

const router = express.Router();

// Yeni sohbet oluşturma
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { user_id, topic } = req.body;
        const text = "INSERT INTO conversations (user_id, topic) VALUES ($1, $2) RETURNING conversation_id";
        const values = [user_id, topic];

        const { rows } = await postgresClient.query(text, values);
        const conversation_id = rows[0].conversation_id;

        res.status(201).json({ conversation_id });
    } catch (error) {
        console.log("Error occurred", error.message);
        res.status(500).json({ message: error.message });
    }
});



// Kullanıcının tüm sohbetlerini getirme
router.get('/:user_id', authenticateToken, async (req, res) => {
    try {
        const { user_id } = req.params;
        const text = "SELECT * FROM conversations WHERE user_id = $1 ORDER BY created_at";
        const values = [user_id];

        const { rows } = await postgresClient.query(text, values);
        res.status(200).json(rows);
    } catch (error) {
        console.log("Error occurred", error.message);
        res.status(500).json({ message: error.message });
    }
});



// Belirli bir sohbetin tüm mesajlarını getirme
router.get('/:conversation_id', authenticateToken, async (req, res) => {
    try {
        const { conversation_id } = req.params;
        const text = "SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at";
        const values = [conversation_id];

        const { rows } = await postgresClient.query(text, values);
        res.status(200).json(rows);
    } catch (error) {
        console.log("Error occurred", error.message);
        res.status(500).json({ message: error.message });
    }
});



// Mesaj gönderme
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { conversation_id, user_id, message_text, sender } = req.body;
        const text = "INSERT INTO messages (conversation_id, user_id, message_text, sender) VALUES ($1, $2, $3, $4) RETURNING message_id";
        const values = [conversation_id, user_id, message_text, sender];

        const { rows } = await postgresClient.query(text, values);
        const message_id = rows[0].message_id;

        res.status(201).json({ message_id });
    } catch (error) {
        console.log("Error occurred", error.message);
        res.status(500).json({ message: error.message });
    }
});




export default router;