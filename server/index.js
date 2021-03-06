const express = require('express');
const bodyParser = require('body-parser');
const GithubRequest = require('./communication/github-request').GithubRequest;
const Database = require('./model/database').Database;
const path = require('path')
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/build')));

const languages = ['elixir', 'ruby', 'python', 'java', 'JavaScript'];

class StartApp {
  
  async start() {
    const githubRequest = new GithubRequest(languages);
    const database = new Database();
    await database.startDatabase();
    
    app.get('/api/search/highlights-repositories', async (req, res) => {
        const result = await githubRequest.makeRequest();
        
        if (! await database.tableHasRows('repositories')) 
          database.storeData(result.response);
        res.send(result.response);
    });
    
    app.get('/api/repository-detail', async (req, res) => {
      const repositoryInfo = await database.getRepositoryInfo(req.query.id);
      res.send(repositoryInfo);
    });
      
    app.listen(port, () => console.log(`Listening on port ${port}`));
  }

}

module.exports.StartApp = StartApp;

const startApp = new StartApp();
startApp.start();
