const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection')
const { getAll, getSale, postSale, updateSale } = require('../../../models/salesModel')

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

describe('Busca uma venda no BD', () => {
    describe('quando não há venda com determinado id', () => {
      const result = [
        {
          id: 1,
          date: '2022-06-22T06:16:27.000Z',
          sale_id: 1,
          product_id: 1,
          quantity: 5
        },
        {
          id: 1,
          date: '2022-06-22T06:16:27.000Z',
          sale_id: 1,
          product_id: 2,
          quantity: 10
        }
      ];
      const id = 1;
  
      beforeEach(async () => {
        sinon.stub(connection, 'execute')
          .resolves(result);
      });
  
      afterEach(async () => {
        connection.execute.restore();
      });
  
      it('Retorna um objeto', async () => {
        const result = await getSale(id);
        expect(result).to.be.an('object');
      });

      it('O objeto não deve estar vazio', async () => {
        const result = await getSale(id);
        expect(result).to.not.be.empty;
      });

      it('O objeto retornado deve ter as propriedades "id", "date", "sale_id", "product_id" e "quantity"', async () => {
        const result = await getSale(id);
        expect(result).to.include.all.keys('id', 'date', 'sale_id', 'product_id', 'quantity');
    });
    });
});

describe('Cria uma nova venda', () => {
  describe('Quando a venda é criada com sucesso', () => {
    const result = [{
      fieldCount: 0,
      affectedRows: 1,
      insertId: 3,
      info: '',
      serverStatus: 2,
      warningStatus: 0
    }]

    const sales = [
      {
        "productId": 1,
        "quantity": 5
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];

    beforeEach(() => {
      sinon.stub(connection, 'execute')
        .resolves(result)
    });

    afterEach(() =>  connection.execute.restore())

    it('Deve retornar um objeto', async () => {
      const result = await postSale(sales)
      expect(result).to.be.a('object')
    });
  })
})
