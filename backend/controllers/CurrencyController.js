import express from 'express';
import axios from 'axios';
import request from 'request-promise';
import authenticateToken from '../Middleware/auth.js';

const router = express.Router();


// API Key
const apiKey = 'API_KEY_HERE';

// Historical currency data API that returns data for a specific date
// !!! currency type must be written in uppercase letters !!!
router.get('/:base_currency', async (req, res) => {
    const { base_currency = req.params.base_currency , 
            date = '2024-07-08' } = req.query;

    const options = {
        //this currency API is from https://app.currencyapi.com/
        uri: 'https://api.currencyapi.com/v3/historical',
        qs: {
            apikey: apiKey,
            base_currency: base_currency,
            date: date
        },
        json: true
    };

    try {
        const response = await request(options);
        return res.status(200).json(response);
    } catch (error) {
        console.log("Error occurred", error.message);
        return res.status(400).json({ message: error.message });
    }
});

export default router;
