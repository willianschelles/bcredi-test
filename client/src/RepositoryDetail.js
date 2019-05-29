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
          console.log(res)
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

    _renderObject(){
        console.log(this.state.response)
        return Object.entries(this.state.response).map(([key, value], i) => {
            console.log(key, value)
            return (
                <ul>
                    <div key={key}>
                        <li>{key}: {value} ;</li>
                    </div>
                </ul>
            )
        })
    }

    render(){
        if(this.state.response.length !== 0){

            return(
                <div>
                    {this._renderObject()}
                </div>
            )
        }
        return <div></div>    
}
};

export default RepositoryDetail;