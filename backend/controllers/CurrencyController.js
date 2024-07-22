import express from 'express';
import request from 'request-promise';
import authenticateToken from '../Middleware/auth.js';

const router = express.Router();


// Currency API key from https://app.currencyapi.com/
const currencyApiKey = 'cur_live_hau7RMmU7fjkuqPQIr3bS2dwKgy26Iu9JxScwBhm';

// Historical currency data API that returns data for a specific date
// !!! currency type must be written in uppercase letters (ex: USD) !!!
router.get('/:base_currency',authenticateToken, async (req, res) => {
    const { base_currency = req.params.base_currency , 
            date = '2024-07-08' } = req.query;

    const options = {
        uri: 'https://api.currencyapi.com/v3/historical',
        qs: {
            apikey: currencyApiKey,
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