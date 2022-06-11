const salesModel = require('../models/salesModel');

const getAll = async () => {
    const sales = await salesModel.getAll();
    const salesList = sales.map((item) => ({
        saleId: item.sale_id,
        date: item.date,
        productId: item.product_id,
        quantity: item.quantity,
    }));
    return salesList;
};

const getSale = async (id) => {
    const sale = await salesModel.getSale(id);
    const salesList = sale.map((item) => ({
        date: item.date,
        productId: item.product_id,
        quantity: item.quantity,
    }));
    return salesList;
};

module.exports = {
    getAll,
    getSale,
};