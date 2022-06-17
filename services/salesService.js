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

const postSale = async (newSales) => {
    const saleId = await salesModel.createSaleID();
    const id = saleId.insertId;

    await Promise.all(
    newSales.map(async (sale) => {
        await salesModel.postSale(id, sale.productId, sale.quantity);
    }),
    );
    
    return {
        id,
        itemsSold: newSales,
    };
};

const updateSale = async (body, saleId) => {   
    const [{ productId, quantity }] = body; 
    
    await salesModel.updateSale(productId, quantity, saleId);

    return { saleId, itemUpdated: body };
};

module.exports = {
    getAll,
    getSale,
    postSale,
    updateSale,
};