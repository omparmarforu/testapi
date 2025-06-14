const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_KEY);
        req.user = verified; // { userId, email, iat, exp }
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};
module.exports = authMiddleware;