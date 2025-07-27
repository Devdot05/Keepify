    const jwt = require('jsonwebtoken');

    function verifyToken(req, res, next) {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: 'No token provided' });

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) return res.status(403).json({ message: 'Invalid token' });
            req.user = user;
            next();
        });
    }

    module.exports = verifyToken;
