const productService = require('../services/productService');

const getAll = async (_req, res) => {
    const products = await productService.getAll();
    return res.status(200).json(products);
};

const getProduct = async (req, res) => {
    const { id } = req.params; 
    const product = await productService.getProduct(id);
    if (product) return res.status(200).json(product);
    return res.status(404).json({ message: 'Product not found' });
};

const postProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const result = await productService.postProduct(name, quantity);
    return res.status(201).json(result);
};

module.exports = {
    getAll,
    getProduct,
    postProduct,
};