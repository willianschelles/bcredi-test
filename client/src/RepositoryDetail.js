import React, { Component } from 'react';
import './RepositoryDetail.css';

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

    _renderObject(){
        return Object.entries(this.state.response).map(([key, value], i) => {
            return (
                <li className="list-group-item list-group-item-dark">{key}: {value}</li>
            )
        })
    }

    render(){
        if(this.state.response.length !== 0){
            return(
                <div>
                    <ul className="list-group">
                        {this._renderObject()}
                    </ul>
                </div>
            )
        }
        return <div></div>    
}
};

export default RepositoryDetail;
