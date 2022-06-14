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
    console.log('Você está tentando postar uma venda');
    console.log(req.body);
    res.status(200).json({ message: 'Você não vai postar uma venda' });
};

const updateSale = async (_req, res) => {
    res.status(200).json({ message: 'atualizar venda' });
};

module.exports = {
    getAll,
    getSaleById,
    postSale,
    updateSale,
};