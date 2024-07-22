
import express from 'express';
import axios from 'axios';
import request from 'request-promise';
import authenticateToken from '../Middleware/auth.js';

const router = express.Router();



// Polygon.io API key and documentation from 
//https://polygon.io/docs/stocks/get_v1_open-close__stocksticker___date
const polygonApiKey = 'FlMFr8iqtsh5zVhTl0Mp52z4NbWpl9ZT';

// Stock data API that returns data for a specific stock ticker
// !!! ticker type must be written in uppercase letters (ex: AAPL) !!!
router.get('/:ticker', authenticateToken, async (req, res) => {
    const { ticker } = req.params;
    const { date = '2024-07-08' } = req.query;

    const options = {
        uri: `https://api.polygon.io/v1/open-close/${ticker}/${date}`,
        qs: {
            apiKey: polygonApiKey,
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




/*
// Yapı Kredi API KEY
const apiKey = 'API_KEY';
const apiUrl = 'https://api.yapikredi.com.tr/api/stockmarket/v1/bistIndices';

// BIST endeks verilerini çeken endpoint
router.get('/bistIndices', authenticateToken, async (req, res) => {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return res.status(200).json(response.data);
    } catch (error) {
        console.log("Error occurred", error.message);
        return res.status(400).json({ message: error.message });
    }
});
*/


export default router;