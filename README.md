
# Node.js Application to consult Github API

### Description:
- Solution built to query the Github API and return 5 featured repositories in 5 languages

### Dependencies to Run Application:

- Node.js version 10.x
- npm version 6.x
- create-react-app 
- postgres
	-- Create a database as follows:
		name: bcredi;
		user: bcredi;
		pwd: bcredi
	-- Create a table as follows:
		name: repositories;
		columns:
			id;
			id_lang;
			name;
			full_name,
			url,
			description,
			score (decimal)


### Running the App:
The Application was divided in two directories (client & server) that can be founded on **develop** branch.
On the *develop* branch:
- Run *npm run dev* on root directory to set up client and server at the same time
- Run *npm run client* on the client/ directory to set up only client application
- Run *npm run server* on the server/ directory to set up only server application

###Link to the Heroku web application 
- [https://young-meadow-19089.herokuapp.com/](https://github.com/pandao/editor.md "Heading link")
