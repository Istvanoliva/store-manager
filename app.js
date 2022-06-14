const express = require('express');

const productsController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

// Middlewares
// const { checkProductId } = require('./middlewares/checkProductId');
const { nameValidator } = require('./middlewares/nameValidator');
const { newProductValidator } = require('./middlewares/newProductValidator');
const { quantityValidator } = require('./middlewares/quantityValidator');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getProduct);

app.post('/products', nameValidator,
quantityValidator, newProductValidator, productsController.postProduct);

app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getSaleById);
// app.post('/sales', checkProductId, quantityValidator);
 
module.exports = app;
