const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection')
const { getAll } = require('../../../models/salesModel')

describe('Busca todos os vendas do BD', () => {
    describe('Quando não há vendas registradas', () => {
        const result = [[],[]];

        beforeEach(async () => {
            sinon.stub(connection, 'execute')
              .resolves(result);
        });

        afterEach(async () => {
            connection.execute.restore();
        });

        it('Retorna um array', async () => {
            const result = await getAll();
            expect(result).to.be.an('array');
        });

        it('O array está vazio', async () => {
            const result = await getAll();
            expect(result).to.be.empty;
        });
    })

    describe('Quando há vendas registradas', () => {
        const result =  [
            {
                "saleId": 1,
                "date": "2022-06-20T22:25:44.000Z",
                "productId": 1,
                "quantity": 5
            },
            {
                "saleId": 1,
                "date": "2022-06-20T22:25:44.000Z",
                "productId": 2,
                "quantity": 10
            },
            {
                "saleId": 2,
                "date": "2022-06-20T22:25:44.000Z",
                "productId": 3,
                "quantity": 15
            }
        ];

        beforeEach(async () => {
            sinon.stub(connection, 'execute')
              .resolves(result);
        });

        afterEach(async () => {
            connection.execute.restore();
        });

        it('Retorna um objeto', async () => {
            const result = await getAll();
            expect(result).to.be.an('object');
        });

        it('O array retornado não está vazio', async () => {
            const result = await getAll();
            expect(result).to.not.be.empty;
        });

        it('O array contém objetos', async () => {
            const result = await getAll();
            expect(result).to.be.an('object');
        })
    });
});