const express = require('express');

const productsController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

// Middlewares
const { checkProductId } = require('./middlewares/checkProductId');
const { nameValidator } = require('./middlewares/nameValidator');
const { newProductValidator } = require('./middlewares/newProductValidator');
const { quantityValidator } = require('./middlewares/quantityValidator');
const { checkProduct } = require('./middlewares/checkProduct');
const { SaleQuantityValidator } = require('./middlewares/saleQuantityValidator');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// PRODUCTS
app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getProduct);

app.post('/products', nameValidator,
quantityValidator, newProductValidator, productsController.postProduct);

app.put('/products/:id',
nameValidator, quantityValidator, checkProduct, productsController.updateProduct);

app.delete('/products/:id', productsController.deleteProduct);

// SALES
app.get('/sales', salesController.getAll);

app.get('/sales/:id', salesController.getSaleById);

app.post('/sales', checkProductId, SaleQuantityValidator, salesController.postSale);
 
app.put('/sales/:id', checkProductId, SaleQuantityValidator);

module.exports = app;
