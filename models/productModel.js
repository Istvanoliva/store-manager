const connection = require('./connection');

const getAll = async () => {
    const query = 'SELECT * FROM StoreManager.products';
    const [products] = await connection.execute(query);
    return products;
};

const getProduct = async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [products] = await connection.execute(query, [id]);
    return products;
};

const postProduct = async (name, quantity) => {
    const query = 'INSERT INTO StoreManager.products(name, quantity) VALUES (?,?);';
    const [newProduct] = await connection.execute(query, [name, quantity]);
    return {
        id: newProduct.insertId,
        name,
        quantity,
    };
};

module.exports = {
    getAll,
    getProduct,
    postProduct,
};