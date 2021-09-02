const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const REQUIRED_STRING = {
    type: String,
    required: true,
};

const REQUIRED_NUM = {
    type: Number,
    required: true,
};

const productSchema = new mongoose.Schema({
    name: REQUIRED_STRING,
    MRP: REQUIRED_STRING,
    sellingPrice: REQUIRED_STRING,
    tags: {
        type: [String],
        required: true,
    },
    category: REQUIRED_STRING,
    volume: REQUIRED_STRING,
    imgURL: REQUIRED_STRING,
    imgURLThumb: REQUIRED_STRING,
    extraImages: {
        type: [String],
        required: true,
    },
    sku: { ...REQUIRED_NUM, index: true },
    slug: REQUIRED_STRING,

});

productSchema.plugin(mongoose_fuzzy_searching, {
    fields: [
        {
            name: 'name',
            weight: 5,
        },
        {
            name: 'tags',
            weight: 4,
        },
        {
            name: 'category',
            weight: 3,
        },
    ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
