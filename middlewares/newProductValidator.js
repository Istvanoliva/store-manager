const { getAll } = require('../services/productService');

const newProductValidator = async (req, res, next) => {
    const { name } = req.body;
    const products = await getAll();
    const alredyExist = products.some((product) => product.name === name);

    if (alredyExist) return res.status(409).json({ message: 'Product already exists' });

    next();
};

module.exports = {
    newProductValidator,
};