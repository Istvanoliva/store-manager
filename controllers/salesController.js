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
    const post = await salesService.postSale(body);
    res.status(201).json(post);
};

const updateSale = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const update = await salesService.updateSale(body, id);
    res.status(200).json(update);
};

module.exports = {
    getAll,
    getSaleById,
    updateSale,
    postSale,
};