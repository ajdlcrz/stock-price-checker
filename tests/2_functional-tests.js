const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Adjust as needed
const { expect } = chai;

chai.use(chaiHttp);

describe('Stock Price Checker API', function () {
  // Test 1: Viewing one stock
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

  // Test 2: Viewing one stock and liking it
  it('should fetch single stock and like it', (done) => {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'GOOG', like: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.stockData).to.have.property('stock');
        expect(res.body.stockData).to.have.property('price');
        expect(res.body.stockData).to.have.property('likes');
        expect(res.body.stockData.likes).to.be.at.least(1);
        done();
      });
  });

  // Test 3: Viewing the same stock and liking it again
  it('should fetch same stock and like it again', (done) => {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'GOOG', like: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.stockData).to.have.property('stock');
        expect(res.body.stockData).to.have.property('price');
        expect(res.body.stockData).to.have.property('likes');
        done();
      });
  });

  // Test 4: Viewing two stocks
  it('should fetch two stocks', (done) => {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: ['GOOG', 'AAPL'] })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.stockData).to.be.an('array');
        expect(res.body.stockData).to.have.length(2);
        expect(res.body.stockData[0]).to.have.property('stock');
        expect(res.body.stockData[0]).to.have.property('price');
        expect(res.body.stockData[0]).to.have.property('rel_likes');
        expect(res.body.stockData[1]).to.have.property('stock');
        expect(res.body.stockData[1]).to.have.property('price');
        expect(res.body.stockData[1]).to.have.property('rel_likes');
        done();
      });
  });

  // Test 5: Viewing two stocks and liking them
  it('should fetch two stocks and like them', (done) => {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: ['GOOG', 'AAPL'], like: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.stockData).to.be.an('array');
        expect(res.body.stockData).to.have.length(2);
        expect(res.body.stockData[0]).to.have.property('stock');
        expect(res.body.stockData[0]).to.have.property('price');
        expect(res.body.stockData[0]).to.have.property('rel_likes');
        expect(res.body.stockData[1]).to.have.property('stock');
        expect(res.body.stockData[1]).to.have.property('price');
        expect(res.body.stockData[1]).to.have.property('rel_likes');
        done();
      });
  });
});
