const { Pool, Client } = require('pg')

class Database {

    constructor() {
        this.client = this.getClient();
        this.pool = this.getPool();
    }
    
    getPool(){ 
        return new Pool({
            user: 'willian',
            host: 'localhost',
            database: 'bcredi',
            password: 'bcredi',
            port: 5432,
        })
    } 

    getClient() {
        return new Client({
            user: 'willian',
            host: 'localhost',
            database: 'bcredi',
            password: 'bcredi',
            port: 5432,
        })
    }

    getRepositoriesByLang(data) {
        return data.map((repositoriesByLang, index) => {
            return repositoriesByLang.map((repos) => {
                const repo = [repos.id, index+1, repos.name, repos.full_name,
                                repos.url, repos.description, repos.score];
                return repo;
            })
        })
    }

    async insertRepositoriesInDB(repositories) {
        repositories.forEach(repository => {
            repository.forEach(repo => {
                const query = {
                    text: 'INSERT INTO repositories(id, id_lang, name, full_name, url, description, score) VALUES($1, $2, $3, $4, $5, $6, $7)',
                    values: repo,
                  }
                this.client.query(query)
                            .then(result => console.log(`Inserted: ${query.values}`))
                            .catch(err => {return err})
            })
        });

    }

    async storeData (data) {
        
        // const languages = await this.client.query('SELECT * FROM languages')
        //                         .then(res => {return res.rows})
        //                         .catch(err => {return err});
        // console.log('languages')
        // console.log(languages)
        const repositories = this.getRepositoriesByLang(data);
        await this.insertRepositoriesInDB(repositories);
        
        
        // console.log(data)
        // const res = await client.query('SELECT $1::text as message', ['Hello world!'])
        // console.log(res.rows[0].message) // Hello world!
        // await this.client.end();
    }

    async startDatabase () {
        await this.client.connect();

    }

}

module.exports.Database = Database;

