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

const createSaleID = async () => {
    const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
    const [saleId] = await connection.execute(query);
    return saleId;
};

const postSale = async (saleId, id, quantity) => {
    const query = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?);`;

    const [post] = await connection.execute(query, [saleId, id, quantity]);
    return post;
};

// const updateSale = async () => {};

module.exports = {
    getAll,
    getSale,
    createSaleID,
    postSale,
};