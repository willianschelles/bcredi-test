import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Router } from 'react-router-dom';

class RepositoryDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: []
    }
  }

  componentDidMount() {
    console.log(this.props)
    console.log(this.props.match.params)

    this.callApi()
      .then(res => {
        this.setState({ response: res })
      })
      .catch(err => console.error(err));
  }

  callApi = async() => {
    const response = await fetch(`/api/repository-detail?id=${this.props.match.params.id}`);
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
            <ul>
              { lang[0].name }
              { lang.map(repo => 
                <li key={repo.id}>
                    <Link to={`/repository-detail`}>{repo.full_name}</Link>
                    {/* <Link to={`/api/repository-detail?id=${repo.id}`}>{repo.full_name}</Link> */}
                </li>) }
              {/* { lang.map(repo => <li key={repo.id}><a href={`/api/repository/detail?${repo.id}`}>{repo.full_name}</a></li>) } */}
              <br></br>
            </ul>
            )}
        </ul>
      );
    }
    return <div></div>
  }

    // console.log(data)
};

export default RepositoryDetail;
