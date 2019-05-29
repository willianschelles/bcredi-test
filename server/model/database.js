const { Pool, Client } = require('pg')

class Database {

    constructor() {
        this.client = this.getClient();
    }

    getClient() {
        return new Client({
            user: 'luirxvoivkkldr',
            host: process.env.DATABASE_URL || 'ec2-54-197-232-203.compute-1.amazonaws.com';
            database: 'd2ikmlaibcnj3d',
            password: 'e743de633ab544d686995966c596d8bed86112cbd8ef65cd58426647b53626f4',
            port: 5432,
        })
    }

    async tableHasRows(tableName) {
        return await this.client.query(`SELECT EXISTS(select * from ${tableName}) as has_row`)
                    .then(result => {return result.rows[0].has_row})
                    .catch(err => {return err})
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
                            .then(result => {return})
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
        
    }

    async getRepositoryInfo(repositoryId) {
        return await this.client.query(`SELECT * FROM repositories WHERE id=${repositoryId}`)
                        .then(res => {return res.rows[0]})
                        .catch(err => {return err});

    }

    async startDatabase () {
        await this.client.connect();

    }

}

module.exports.Database = Database;

