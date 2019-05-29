const chai = require('chai');
const chaiHttp = require('chai-http');
const Server = require('../index');
const request = require('request');
const Database = require('../persistence/database').Database;


const should = chai.should();
const urlBase = 'http://localhost:5000';
const expect = chai.expect;
const assert = chai.assert;
// const server = new Server();

chai.use(chaiHttp);
console.log(Server)

describe('Repositories Test API', function() {
    this.timeout(4000);
   
    it('should list repositories of 5 languages, and 5 repositories for each language on /api/search/highlights-repositories GET', (done) => {
        request.get( 
            { url: urlBase + '/api/search/highlights-repositories' }
            ,
            (error, response, body) => {
                if (error) console.log(error);
                
                //list repositories of 5 languages
                const reposByLanguages = JSON.parse(body);
                reposByLanguages.should.be.a('array');
                expect(response.statusCode).to.equal(200);
                expect(reposByLanguages).to.have.lengthOf(5);

                //5 repositories for each language 
                for (let i = 0; i < reposByLanguages.length; ++i) {
                    const repositories = reposByLanguages[i];

                    repositories.should.be.a('array');
                    expect(repositories).to.have.lengthOf(5)
                    
                    repositories.forEach(repository => {
                        repository.should.have.property('id');
                        repository.should.have.property('name');
                        repository.should.have.property('full_name');
                        repository.should.have.property('url');
                        repository.should.have.property('description');
                        repository.should.have.property('score');
                    });
                }
    
                done()
            })
    });

        
    it('should list repository informations stored in postgres database on /api/repository-detail GET', (done) => {
        request.get( 
            { url: urlBase + '/api/search/highlights-repositories' }
            ,
            (error, response, body) => {
                const reposByLanguages = JSON.parse(body);
                expect(response.statusCode).to.equal(200);

                for (let i = 0; i < reposByLanguages.length; ++i) {
                    const repositories = reposByLanguages[i];
                    repositories.should.be.a('array');
                    
                    repositories.forEach(repository => {
                        request.get({url: urlBase + '/api/repository-detail?id=' + repository.id},
                        (err, response, body) => {
                            expect(response.statusCode).to.equal(200);
                            const repositoryInfo = JSON.parse(body);
                            
                            repositoryInfo.should.be.a('object');
                            repositoryInfo.should.have.property('id');
                            repositoryInfo.should.have.property('id_lang');
                            repositoryInfo.should.have.property('name');
                            repositoryInfo.should.have.property('full_name');
                            repositoryInfo.should.have.property('url');
                            repositoryInfo.should.have.property('description');
                            repositoryInfo.should.have.property('score');
                        })
                    });
                }
                done()
            })
    });
});
