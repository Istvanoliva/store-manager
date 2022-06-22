const sinon = require('sinon');
const { expect } = require('chai');

const saleController = require('../../../controllers/salesController');
const saleService = require('../../../services/salesService');


describe('Chamada do controller getAll', () => {

  describe('Quando há vendas cadastradas', () => {

    const result = [
      {
        "saleId": 1,
        "date": "2022-05-13T17:23:37.000Z",
        "productId": 1,
        "quantity": 5
      },
      {
        "saleId": 1,
        "date": "2022-05-13T17:23:37.000Z",
        "productId": 2,
        "quantity": 10
      },
      {
        "saleId": 2,
        "date": "2022-05-13T17:23:37.000Z",
        "productId": 3,
        "quantity": 15
      }
    ];

    const request = {};
    const response = {};

    beforeEach(async () => {
      sinon.stub(saleService, 'getAll').returns(result);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    afterEach(async () => {
      saleService.getAll.restore();
    });

    it('Retorna status 200', async () => {
      await saleController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('O metodo json é chamado com as vendas', async () => {
      await saleController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Quando não há vendas cadastradas', () => {
    const response = {}
    const request = {}
    const result = [];

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'getAll').resolves(result);
    })

    afterEach(() => {
      saleService.getAll.restore();
    })

    it('Retorna o "status" passando o código 200', async () => {
      await saleController.getAll(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('Retorna o metodo json contendo um array', async () => {
      await saleController.getAll(request, response)

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })

});

describe('Chamada do controller getSaleById', () => {
  describe('Quando existe uma venda específica', () => {
    const response = {}
    const request = {}
    const result = [
      { date: '2022-06-22T03:57:22.000Z', productId: 1, quantity: 5 },
      { date: '2022-06-22T03:57:22.000Z', productId: 2, quantity: 10 }
    ];

    beforeEach(async () => {
      sinon.stub(saleService, 'getSale').returns(result);

      request.params = { id: 1 }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    afterEach(async () => {
      saleService.getSale.restore();
    });

    it('Retorna o "status" passando o código 200', async () => {
      await saleController.getSaleById(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('Retorna o metodo json contendo um array', async () => {
      await saleController.getSaleById(request, response)

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })
})

describe('Chamada do controller updateSale', () => {
  describe('Quando uma venda é atualizada com sucesso', () => {
    const response = {};
    const request = {};
    const result = {
      saleId: 1,
      itemUpdated: [
        {
          productId: 8,
          quantity: 3,
        }
      ],
    };

    beforeEach(() => {
      request.params = { id: 1 };
      request.body = [{ productId: 8, quantity: 3 }];
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'updateSale').resolves(result);
    });

    afterEach(() => {
      saleService.updateSale.restore();
    });

    it('Retorna um "status" 200', async () => {
      await saleController.updateSale(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});