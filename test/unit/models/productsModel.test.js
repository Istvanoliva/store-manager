const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection')
const { getAll, getProduct, updateProduct } = require('../../../models/productModel');

describe('Busca todos os produtos do BD', () => {
    describe('Quando não há produtos registrados', () => {
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

    describe('Quando há produtos registrados', () => {
        const result = [
            {
                id: 1,
                name: 'Martelo de Thor',
                quantity: 10
            },
            {
                id: 2,
                name: 'Traje de encolhimento',
                quantity: 20
            },
            {
                id: 3,
                name: 'Escudo do Capitão América',
                quantity: 30
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

        it('Os objetos devem possuir as propriedades "id", "name" e "quantity"', async () => {
            const result = await getAll();
            expect(result).to.include.all.keys('id', 'name', 'quantity');
        })
    });
});

describe('Busca um produto específico no BD', () => {
    describe('Quando não há produto com id válido', () => {
        const invalidID = 327;
        const result = [[],[]];

        beforeEach(async () => {
            sinon.stub(connection, 'execute')
              .resolves(result);
        });

        afterEach(async () => {
            connection.execute.restore();
        });

        it('Retona um array', async () => {
            const result = await getProduct(invalidID);
            expect(result).to.be.an('array');
        });

        it('O array está vazio', async () => {
            const result = await getProduct(invalidID);
            expect(result).to.be.empty;
        })

    });

    describe('Quando existe um produto específico', () => {
        const id = 1;
        const result = [{
                id: 1,
                name: 'Martelo de Thor',
                quantity: 10
            }];

        beforeEach(async () => {
            sinon.stub(connection, 'execute')
              .resolves(result);
        });

        afterEach(async () => {
            connection.execute.restore();
        });

        it('Retorna um objeto', async () => {
            const result = await getProduct(id);
            expect(result).to.be.an('object');
        });

        it('O objeto deve possuir propriedades "id", "name", "quantity"', async () => {
            const result = await getProduct(id);
            expect(result).to.include.all.keys('id', 'name', 'quantity');;
        });
    })
});

describe('Atualiza um produto no BD', () => {
    describe('Atualiza um produto', () => {
        const id = 60;
        const name = 'Chocolate';
        const quantity = 350;
        const message = { id: 60, name: 'Chocolate', quantity: 350 };
        const zero = 0;

        beforeEach(async () => {
            sinon.stub(connection, 'execute')
              .resolves(message);
        });

        afterEach(async () => {
            connection.execute.restore();
        });

        it('Retorna um objeto', async () => {
            const result = await updateProduct(id, name, quantity);
            expect(result).to.be.an('object');
        });

        it('O objeto retornado não pode estar vazio', async () => {
            const result = await updateProduct(id, name, quantity);
            expect(result).to.not.be.empty;
        });

        it('O objeto retornado deve ter as propriedades "id", "name" e "quantity"', async () => {
            const result = await updateProduct(id, name, quantity);
            expect(result).to.include.all.keys('id', 'name', 'quantity');
        });

        it('O valor "quantity" no objeto não deve ser menor ou igual à zero', async () => {
            const result = await updateProduct(id, name, quantity);
            expect(result.quantity).to.not.be.equal(zero);
        })
    });
});