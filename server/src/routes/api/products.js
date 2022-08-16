const express = require('express');

const router = express.Router();

const Product = require('../../models/product.model');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        // console.log(error);  // For DEBUGGING
        res.status(500).send('server error');
    }
});

router.get('/home', async (req, res) => {
    try {
        const fruits = await Product.fuzzySearch('fruit')
            .limit(Number(5));
        const veggies = await Product.fuzzySearch('vegetable')
            .limit(Number(5));
        const oils = await Product.fuzzySearch('oil')
            .limit(Number(5));
        const dairy = await Product.fuzzySearch('dairy')
            .limit(Number(5));

        res.status(200).json([...fruits, ...veggies, ...oils, ...dairy]);
    } catch (error) {
        // console.log(error);  // For DEBUGGING
        res.status(500).send('server error');
    }
});

router.get('/details', async (req, res) => {
    try {
        const { id } = req.query;
        const productDetails = await Product.findById(id);

        res.status(200).json(productDetails);
    } catch (error) {
        // console.log(error);  // For DEBUGGING
        res.status(500).send('server error');
    }
});

// TODO: Add current offset and page in the response
router.get('/product/search', async (req, res) => {
    const { query, limit, offset } = req.query;
    try {
        const products = await Product.fuzzySearch(query)
            .limit(Number(limit) || 0)
            .skip(Number(offset) || 0);

        res.status(200).json([...products]);
    } catch (error) {
        console.log(error); // For DEBUGGING
        res.status(500).send('server error');
    }
});

router.post('/add', async (req, res) => {
    console.log(req.body);
    const {
        name,
        MRP,
        sellingPrice,
        tags,
        category,
        volume,
        imgURL,
        imgURLThumb,
        extraImages,
        sku,
        slug,
    } = req.body;

    try {
        const newProduct = await new Product({
            name,
            MRP,
            sellingPrice,
            tags,
            category,
            volume,
            imgURL,
            imgURLThumb,
            extraImages,
            sku,
            slug,
        }).save();
        res.status(201).json(newProduct);
        console.log(req.body);
    } catch (error) {
        console.log(req.body);
        console.log(error);
        res.status(500).send('server error');
    }
});

module.exports = router;
