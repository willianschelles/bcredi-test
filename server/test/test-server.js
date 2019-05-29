const chai = require('chai');
const chaiHttp = require('chai-http');
const Server = require('../index');
const request = require("request");


const should = chai.should();
const urlBase = 'http://localhost:5000';
const expect = chai.expect;

// const server = new Server();

chai.use(chaiHttp);
console.log(Server)

describe('Repositories Test API', function() {
  it('should list ALL repositories on /api/search/highlights-repositories GET');
});

it('should list repositories of 5 languages on /api/search/highlights-repositories GET', function(done) {
    request.get( 
        { url: urlBase + '/api/search/highlights-repositories' }
        ,
        function(error, response, body) {
            if (error) console.log(error);
            body = JSON.parse(body);
            expect(response.statusCode).to.equal(200);
            expect(body).to.have.lengthOf(5);
            done()
        })
});