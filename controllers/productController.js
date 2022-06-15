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

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const update = await productService.updateProduct(id, name, quantity);
    if (!update) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(update);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await productService.deleteProduct(id);
    if (product === null) return res.status(404).json({ message: 'Product not found' });
    return res.status(204).end();
};

module.exports = {
    getAll,
    getProduct,
    postProduct,
    updateProduct,
    deleteProduct,
};