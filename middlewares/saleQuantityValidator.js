const SaleQuantityValidator = async (req, res, next) => {
    const { body } = req;

    const checkQuantity = body.some((item) => item.quantity === undefined);
    const checkValidQuantity = body.some((item) => item.quantity <= 0);

    if (checkQuantity) return res.status(400).json({ message: '"quantity" is required' });

    if (checkValidQuantity) {
        return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    next();
};

module.exports = {
    SaleQuantityValidator,
};