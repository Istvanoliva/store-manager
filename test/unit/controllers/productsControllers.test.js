const sinon = require('sinon');
const { expect } = require('chai');

const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');

describe('Chamada do controller getAll', () => {
    describe('Quando não existem produtos no banco', () => {
      const response = {}
      const request = {}
      const result = [];
  
      beforeEach(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(productService, 'getAll').resolves(result);
      })
  
      afterEach(() => {
        productService.getAll.restore();
      })
  
      it('Retorna o "status" passando o código 200', async () => {
        await productController.getAll(request, response)
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
  
      it('Retorna o metodo json contendo um array', async () => {
        await productController.getAll(request, response)
  
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      })
    })
  
    describe('Quando há produtos registrados', () => {
      const response = {};
      const request = {};
  
      const result = [
        { "id": 1, "name": 'Martelo de Thor', "quantity": 10 },
        { "id": 2, "name": 'Traje de encolhimento', "quantity": 20 },
        { "id": 3, "name": 'Escudo do Capitão América', "quantity": 30 }
      ];
  
      beforeEach(() => {
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
  
        sinon.stub(productService, 'getAll')
          .resolves();
      })
  
      afterEach(() => {
        productService.getAll.restore();
      });
  
      it('Retorna o "status" passando o código 200', async () => {
        await productController.getAll(request, response);
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('Retorna o metodo json contendo um array', async () => {
        await productController.getAll(request, response);
  
        expect(response.json.calledWith(result)).to.be.equal(false);
      });
    });
  });

  describe('Chamada do controller postProduct', () => {
    describe('Quando não há produto cadastrado com mesmo nome', () => {
      const response = {};
      const request = {};
      const result = {
        id: 5,
        name: 'Martelo',
        quantity: 70
      };
  
      beforeEach(() => {
        request.body = { name: 'Martelo', quantity: 70 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(productService, 'postProduct').resolves(result);
      });
  
      afterEach(() => {
        productService.postProduct.restore();
      });
  
      it('Retorna o "status" passando o código 201', async () => {
        await productController.postProduct(request, response);
  
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
  
      it('Chama o método "json" passando um objeto', async () => {
        await productController.postProduct(request, response);
  
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
  
      it('Chama o método "json" passando um objeto específico', async () => {
        await productController.postProduct(request, response);
  
        expect(response.json.calledWith(result)).to.be.equal(true);
      });
    });
  });