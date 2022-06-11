const express = require('express');

const productsController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getProduct);

app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getSaleById);
 
module.exports = app;
