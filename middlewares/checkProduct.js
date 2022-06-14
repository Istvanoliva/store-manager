const { getAll } = require('../services/productService');

const checkProduct = async (req, res, next) => {
    const { name } = req.body;
    const products = await getAll();
    const alredyExist = products.some((product) => product.name === name);

    if (!alredyExist) return res.status(404).json({ message: 'Product not found' });
    next();
};

module.exports = {
    checkProduct,
};