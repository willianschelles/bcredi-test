import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h4 className="App-title">Buscar Repositórios em Destaque</h4>
          <button><Link to="/repositories">Buscar Repositórios em Destaque</Link></button>
        </header>
      </div>
    );
  }
};

export default App;
