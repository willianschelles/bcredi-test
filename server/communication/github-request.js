const https = require('https');


class GithubRequest {

    constructor (languages) {
        this.languages = languages
    }
    
    buildOptions (language) {
        return  {
            host: 'api.github.com',
            path: `/search/repositories?o=desc&q=${language}&s=stars&type=Repositories&page=1&per_page=2`,
            port: 443,
            method: 'GET',
            headers: {
                'user-agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)',
                'Authorization': 'Bearer 7c7e72e34ae97ede72455d79f06c060c3e64298e'
            }
        };
    }

    async getFiveMajorReposFor(language) {
        return new Promise((resolve, reject) => {
            const options = this.buildOptions(language);
    
            const req = https.request(options, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                    // process.stdout.write(data);
                });
        
                response.on('end', () => {
        
                    const repos = JSON.parse(data)['items'];
                    // console.log('repos.length')
                    // console.log(repos)
                    // console.log(repos.length)
                    return resolve(repos);
                    // array.forEach(element => {
                    //     console.log(element)
                    //     console.log()
                    // });
                });
            })
        
            req.on('erro', (err) => {
                console.error(err);
            });
        
            req.end();
        })
    };
    
    
    // const bangDosBanguers = `o=desc&q=elixir&s=stars&type=Repositories&page=1&per_page=5`; 
    
    clusterRepoByLang(fiveRepo, language) {
        let obj = {};
        obj[language] = fiveRepo;        
        return obj
    }

    async makeRequest () {
        return new Promise((resolve, reject) => {

            const response = [];
            this.languages.forEach(async (language) => {
                let fiveRepo = await this.getFiveMajorReposFor(language);
                fiveRepo = this.clusterRepoByLang(fiveRepo, language)

                response.push(fiveRepo);

                if (response.length === this.languages.length) {
                    response.forEach(ele => console.log(ele))
                    return resolve({response});
                }
            });
        })
    }
}

module.exports.GithubRequest = GithubRequest;
    