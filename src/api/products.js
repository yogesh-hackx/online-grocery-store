const express = require('express');

const router = express.Router();

const Product = require('../models/product.model');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        // console.log(error);  // For DEBUGGING
        res.status(500).send('server error');
    }
});

router.post('/add', async (req, res) => {
    const {
        name,
        MRP,
        sellingPrice,
        quantityAvailable,
        productDetails,
    } = req.body;

    try {
        const newProduct = await new Product({
            name,
            MRP,
            sellingPrice,
            quantityAvailable,
            productDetails,
        }).save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).send('server error');
    }
});

module.exports = router;
