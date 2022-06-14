const connection = require('./connection');

const getAll = async () => {
    const query = `
    SELECT * FROM StoreManager.sales as a
    JOIN StoreManager.sales_products as sp
    WHERE a.id = sp.sale_id`;
    const [sales] = await connection.execute(query);
    return sales;
};

const getSale = async (id) => {
    const query = `
    SELECT * FROM StoreManager.sales as s
    JOIN StoreManager.sales_products as sp
    ON s.id = sp.sale_id
    WHERE s.id = ?`;
    const [sale] = await connection.execute(query, [id]);
    return sale;
};

// const postSale = async () => {};

// const updateSale = async () => {};

module.exports = {
    getAll,
    getSale,
};