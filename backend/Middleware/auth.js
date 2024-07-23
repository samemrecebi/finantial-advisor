import jwt from 'jsonwebtoken';
import cp from 'cookie-parser';

const JWT_SECRET = 'interntech_token'

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.cookie;

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export default authenticateToken;