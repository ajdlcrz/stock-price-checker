const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Adjust as needed
const { expect } = chai;

chai.use(chaiHttp);

describe('Stock Price Checker API', function () {
  it('should fetch single stock', (done) => {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'GOOG' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.stockData).to.have.property('stock');
        expect(res.body.stockData).to.have.property('price');
        expect(res.body.stockData).to.have.property('likes');
        done();
      });
  });

  it('should fetch two stocks and show relative likes', (done) => {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: ['GOOG', 'AAPL'] })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.stockData).to.be.an('array');
        expect(res.body.stockData[0]).to.have.property('rel_likes');
        expect(res.body.stockData[1]).to.have.property('rel_likes');
        done();
      });
  });
});
