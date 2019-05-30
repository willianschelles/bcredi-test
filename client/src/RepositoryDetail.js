import React, { Component } from 'react';
// import './RepositoryDetail.css';

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
            if (key === 'url' ) {
                return (
                    <tr>
                        <th scope="row">{key}</th>
                            <td><a href={value}>{value}</a></td>
                    </tr>
                )
            }
            return (
                <tr>
                    <th scope="row">{key}</th>
                        <td>{value}</td>
                </tr>
            )
        })
    }
    getRepoName() {
        return (
            <a><b>{this.state.response["full_name"]}:</b></a>
        )
    }

    render(){
        if(this.state.response.length !== 0){
            return(
                <div className="container">
                    Detalhes de {this.getRepoName()}
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Propriedade</th>
                                <th scope="col">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this._renderObject()}
                        </tbody>
                    </table>
                </div>
            )
        }
        return <div></div>    
    }
};

export default RepositoryDetail;