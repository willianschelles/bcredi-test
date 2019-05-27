const express = require('express');
const bodyParser = require('body-parser');
const GithubRequest = require('./communication/github-request').GithubRequest;

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const languages = ['elixir', 'ruby', 'python', 'java'];

const githubRequest = new GithubRequest(languages);

app.get('/api/search/highlights-repositories', async (req, res) => {
    const result = await githubRequest.makeRequest();
    console.log('result')
    console.log(typeof(result))
    console.log(result.response)
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