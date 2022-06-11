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

module.exports = {
    getAll,
    getSaleById,
};