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

const updateProduct = async (id, name, quantity) => {
    const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?';

    await connection.execute(query, [name, quantity, id]);
    return { id, name, quantity };
};

const deleteProduct = async (id) => {
    const query = 'DELETE FROM StoreManager.products WHERE id = ?';

    await connection.execute(query, [id]);
};

module.exports = {
    getAll,
    getProduct,
    postProduct,
    updateProduct,
    deleteProduct,
};