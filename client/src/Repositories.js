import React, { Component } from 'react';
// import logo from './logo.svg';
import './Repositories.css';
import { Link } from 'react-router-dom';

class Repositories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: []
    }
  }

  componentDidMount() {

    this.callApi()
      .then(res => {
        this.setState({ response: res })
      })
      .catch(err => console.error(err));
  }

  callApi = async() => {
    const response = await fetch('/api/search/highlights-repositories');
    const body = await response.json();

    // const parsedResponse = JSON.parse(body.express);
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });

    const body = await response.text();
    this.setState({ responseToPost: body });
  }
  
  render() {

    if(this.state.response.length !== 0){
      return (

        <ul>
          {this.state.response.map((lang) => 
            <ol className="betterList">
              { lang[0].language }
              { lang.map(repo => 
                <li key={repo.id}>
                    <Link to={`/repository-detail/${repo.id}`}>{repo.full_name}</Link>
                </li>) }
              <br></br>
            </ol>
            )}
        </ul>
      );
    }
    return <div></div>
  }

    // console.log(data)
};

export default Repositories;
