const checkProductId = (req, res, next) => {
    const { body } = req;

    const checkId = body.some((item) => item.productId === undefined);
    
    if (checkId) return res.status(400).json({ message: '"productId" is required' });

    next();
};

module.exports = {
    checkProductId,
};