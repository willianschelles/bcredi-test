import React, { Component } from 'react';
// import logo from './logo.svg';

class RepositoryDetail extends Component {
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
    const response = await fetch(`/api/repository-detail?id=${this.props.match.params.id}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

    
  render() {

    if(this.state.response.length !== 0){
      return (
        <ul>
          {this.state.response.map((repoInfo) => 
            <li key={repoInfo.id}>
              Name: { repoInfo.name }
              <br></br>
              <br></br>
              Full Name: { repoInfo.full_name }
              <br></br>
              <br></br>
              Description: { repoInfo.description }
              <br></br>
              <br></br>
              URL: { repoInfo.url }
              <br></br>
              <br></br>
              Score: { repoInfo.score }
              <br></br>
              <br></br>
            </li>
            )}
        </ul>
      );
    }
    return <div></div>
  }
};

export default RepositoryDetail;
