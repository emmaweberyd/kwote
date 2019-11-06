const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // check for token
    if(!token) return res.status(401).send({ msg: 'No token, authorization denied' });

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // add user from payload
        req.user = decoded;
        next(); 

    } catch(e) {
        res.status(400).send({ msg: 'Invalid token' })
    }
}

module.exports = auth;