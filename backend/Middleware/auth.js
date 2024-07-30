import jwt from 'jsonwebtoken';

const JWT_SECRET = 'interntech_token'

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export default authenticateToken;