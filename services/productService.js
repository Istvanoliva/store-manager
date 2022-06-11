const productModel = require('../models/productModel');

const getAll = async () => {
    const products = await productModel.getAll();
    return products;
};

const getProduct = async (id) => {
    const [product] = await productModel.getProduct(id);
    return product;
};

module.exports = {
    getAll,
    getProduct,
};