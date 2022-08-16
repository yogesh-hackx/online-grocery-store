const express = require('express');

const products = require('./products.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'API for grocery-store',
    });
});

router.use('/products', products);

module.exports = router;
