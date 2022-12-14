const { getProduct } = require('../services/productService');
const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
    const sales = await salesService.getAll();
    return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.getSale(id);
    if (!sale.length) return res.status(404).json({ message: 'Sale not found' });    
    return res.status(200).json(sale);
};

const postSale = async (req, res) => {
    const { body } = req;
    const [{ productId, quantity }] = body;
    const checkInventory = await getProduct(productId);

    if (quantity > checkInventory.quantity) {
        return res.status(422).json({ message: 'Such amount is not permitted to sell' });
    }

    const post = await salesService.postSale(body);
    res.status(201).json(post);
};

const updateSale = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const update = await salesService.updateSale(body, id);
    res.status(200).json(update);
};

const deleteSale = async (req, res) => {
    const { id } = req.params;
    const deleted = await salesService.deleteSale(id);
    if (deleted.affectedRows === 0) return res.status(404).json({ message: 'Sale not found' });
    return res.status(204).end();
};

module.exports = {
    getAll,
    getSaleById,
    updateSale,
    postSale,
    deleteSale,
};