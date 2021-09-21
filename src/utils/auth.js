const jwt = require('express-jwt');

const getTokenFromHeader = (req) => {
    if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token')
        || (req.headers.authorization && req.headers.authorization.split(' '[0] === 'Bearer'))) {
        return req.headers.authorization.split(' ')[1];
    }
};

const auth = {
    required: jwt({
        secret: process.env.JWT_SECRET,
        userProperty: 'payload',
        getToken: getTokenFromHeader
    }),
};

module.exports = auth;
