import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: []
    }
  }
  // state = {
  //   response: '',
  //   post: '',
  //   responseToPost: ''
  // };

  componentDidMount() {

    this.callApi()
      .then(res => {
        // console.log(typeof(JSON.parse(res.express).response))
        // const response = JSON.parse(res.express).response
        // const express = JSON.parse(res.express)
        // console.log(JSON.parse(res.express).response)
        console.log('res')
        console.log(res)
        this.setState({ response: res })
        // this.setState({ response: express }) 
      })
      .catch(err => console.error(err));
  }

  callApi = async() => {
    const response = await fetch('/api/search/highlights-repositories');
    const body = await response.json();
    console.log('body')
    console.log(typeof(body))
    console.log(body)

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
  
  swap(json){
    var ret = {};
    for(var key in json){
      ret[json[key]] = key;
    }
    return ret;
  }
  
  render() {
    
    if(this.state.response.length !== 0){
      return (
        <ul>
          {this.state.response.map((lang, index) => 
            <ul>
              { lang[0].name }
              { lang.map(repo => <li>{repo.full_name}</li>) }
            </ul>
            )}
        </ul>
      );
    }
    return <div></div>
  }
    // console.log(data)
};

export default App;
