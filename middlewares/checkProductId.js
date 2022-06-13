const checkProductId = (req, res, next) => {
    const { body } = req;
    if (!body.productId) {
        return res.status(400).json({ message: '"productId" is required' });
    }
    next();
};

module.exports = {
    checkProductId,
};