import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { Button } from 'react-bootstrap'



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="nav navbar-nav mr-auto">
          <li className="nav-item active">
            <div>
              <nav>
                <Link to="/home">Home</Link>
              </nav>
              <div>
                <Route path="/home" />
              </div>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="teams.html">Teams</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="players.html">Players</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="coaches.html">Coaches</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="seasons.html">Seasons</a>
          </li>
        </ul>

        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item">
            <a className="nav-link" href="about.html">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="contact.html">Contact Us</a>
          </li>
        </ul>
      </div>
      </div>
    );
  }
}

export default App;
