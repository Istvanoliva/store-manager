const productModel = require('../models/productModel');

const getAll = async () => {
    const products = await productModel.getAll();
    return products;
};

const getProduct = async (id) => {
    const [product] = await productModel.getProduct(id);
    return product;
};

const postProduct = async (name, quantity) => {
    const product = await productModel.postProduct(name, quantity);
    return product;
};

const updateProduct = async (id, name, quantity) => {
    const putProduct = await productModel.updateProduct(id, name, quantity);
    return putProduct;
};

module.exports = {
    getAll,
    getProduct,
    postProduct,
    updateProduct,
};