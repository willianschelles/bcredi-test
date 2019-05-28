const express = require('express');
const bodyParser = require('body-parser');
const GithubRequest = require('./communication/github-request').GithubRequest;
const Database = require('./persistence/database').Database;

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const languages = ['elixir', 'ruby', 'python', 'java', 'JavaScript'];


class StartApp {
  
  
  // const languages = ['elixir', 'ruby'];
  async start() {
    const githubRequest = new GithubRequest(languages);
    const database = new Database();
    await database.startDatabase();
    
    app.get('/api/search/highlights-repositories', async (req, res) => {
        const result = await githubRequest.makeRequest();
        database.storeData(result.response);
        res.send(result.response);
        // res.send({express: JSON.stringify(result)});
    });
    
    app.post('/api/world', (req, res) => {
        console.log(req.body);
        res.send(
          `I received your POST request. This is what you sent me: ${req.body.post}`,
        );
    });
      
    app.listen(port, () => console.log(`Listening on port ${port}`));
  }
}

module.exports.StartApp = StartApp;

const startApp = new StartApp();
startApp.start();
