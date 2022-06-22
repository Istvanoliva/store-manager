const { expect } = require('chai');
const sinon = require('sinon');

const productService = require('../../../services/productService');
const { getAll, getProduct, deleteProduct } = require('../../../services/productService');
const productModel = require('../../../models/productModel');

describe('Testa a função getAll na camada Service', () => {
    describe('Quando há produtos cadastrados', () => {
        const result = [
            { id: 1, name: 'Martelo de Thor', quantity: 10 },
            { id: 2, name: 'Traje de encolhimento', quantity: 20 },
            { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
          ];

        beforeEach(async () => {
            sinon.stub(productModel, 'getAll')
              .resolves(result);
        });

        afterEach(async () => {
            productModel.getAll.restore();
        });

        it('Retorna um array', async () => {
            const result = await getAll();
            expect(result).to.be.an('array');
        });
      
        it('O array  não está vazio', async () => {
          const result = await getAll();
          expect(result).to.not.be.empty;
        });
    });

    describe('Quando não há produtos cadastrados', () => {
        const result = [];

        beforeEach(async () => {
            sinon.stub(productModel, 'getAll')
              .resolves(result);
        });

        afterEach(async () => {
            productModel.getAll.restore();
        });

        it('Retorna um array', async () => {
            const result = await getAll();
            expect(result).to.be.an('array');
        });
      
        it('O array está vazio', async () => {
          const result = await getAll();
          expect(result).to.be.empty;
        });
    });
});

describe('Testa a função getProduct na camada Service', () => {
    describe('Quando há um produto cadastrado', () => {
        const result = [{ id: 1, name: 'Martelo de Thor', quantity: 10 }];
        const id = 1;

        beforeEach(async () => {
            sinon.stub(productModel, 'getProduct')
              .resolves([result]);
        });

        afterEach(async () => {
            productModel.getProduct.restore();
        });

        it('retorna um objeto', async () => {
            const [product] = await getProduct(id);
            expect(product).to.be.an('object');
        });

        it('O objeto não está vazio', async () => {
            const [product] = await getProduct(id);
            expect(product).to.not.be.empty;
        });  
      
        it('o objeto possui as propriedades "id", "name" e "quantity"', async () => {
          const [product] = await getProduct(id);
          expect(product).to.include.all.keys('id', 'name', 'quantity');
        });
    });
});

