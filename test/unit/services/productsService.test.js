const { expect } = require('chai');
const sinon = require('sinon');

const { getAll } = require('../../../services/productService');
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
      
        it('O array não está vazio', async () => {
          const result = await getAll();
          expect(result).to.be.empty;
        });
    });
});