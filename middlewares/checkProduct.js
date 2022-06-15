const { getProduct } = require('../services/productService');

const checkProduct = async (req, res, next) => {
    const { id } = req.params;
    const products = await getProduct(id);

    if (!products) return res.status(404).json({ message: 'Product not found' });

    next();
};

module.exports = {
    checkProduct,
};