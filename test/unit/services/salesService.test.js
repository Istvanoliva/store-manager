const { expect } = require('chai');
const sinon = require('sinon');

const { getAll } = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');

describe('Testa a função getAll na camada Service', () => {
    describe('Quando há vendas cadastradas', () => {
        const result = [
            {
              id: 1,
              date: '2022-06-21T07:44:54.000Z',
              sale_id: 1,
              product_id: 1,
              quantity: 5
            },
            {
              id: 1,
              date: '2022-06-21T07:44:54.000Z',
              sale_id: 1,
              product_id: 2,
              quantity: 10
            },
            {
              id: 2,
              date: '2022-06-21T07:44:54.000Z',
              sale_id: 2,
              product_id: 3,
              quantity: 15
            }
          ]

        beforeEach(async () => {
            sinon.stub(salesModel, 'getAll')
              .resolves(result);
        });

        afterEach(async () => {
            salesModel.getAll.restore();
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

    describe('Quando não há vendas cadastradas', () => {
        const result = [];

        beforeEach(async () => {
            sinon.stub(salesModel, 'getAll')
              .resolves(result);
        });

        afterEach(async () => {
            salesModel.getAll.restore();
        });

        it('Retorna um array', async () => {
            const result = await getAll();
            expect(result).to.be.an('array');
        });
      
        it('O array  não está vazio', async () => {
          const result = await getAll();
          expect(result).to.be.empty;
        });
    });
});