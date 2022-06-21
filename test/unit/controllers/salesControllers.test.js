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

});