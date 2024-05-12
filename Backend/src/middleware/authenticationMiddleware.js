const jwt = require('jsonwebtoken');

require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

module.exports = function authenticationMiddleware(req, res, next) {
    const cookie = req.cookies;
    if (!cookie) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = cookie.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
}

// Path: Backend/src/middleware/authorizationMiddleware.js