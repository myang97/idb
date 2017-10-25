import React, { Component } from 'react';
import '../styles/App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { Navbar, Nav} from 'react-bootstrap'
import { About } from './About.js'
import { Splash } from './Splash.js'
import { Player } from './Player.js'
import { Players } from './Players.js'
import { Season } from './Season.js'
import { Seasons } from './Seasons.js'
import { Coach } from './Coach.js'
import { Coaches } from './Coaches.js'
import { Team } from './Team.js'
import { Teams } from './Teams.js'

const NavInstance = () => {
  return (
    <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <nav>
          <Link to="/">NFLDB</Link>
        </nav>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <nav>
          <Link to="/about">About</Link>
          <Link to="/players">Players</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/coaches">Coaches</Link>
          <Link to="/seasons">Seasons</Link>
        </nav>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)};
  
class App extends Component {
  render() {
    return (
      <div>
        <NavInstance />
        <Route exact path="/" component={Splash}/>
        <Route path="/about" component={About}/>
        <Route exact path="/players/" component={Players}/>
        <Route path="/players/:id" component={Player}/>
        <Route exact path="/teams/" component={Teams}/>
        <Route path="/teams/:id" component={Team}/>
        <Route exact path="/coaches/" component={Coaches}/>
        <Route path="/coaches/:id" component={Coach}/>
        <Route exact path="/seasons/" component={Seasons}/>
        <Route path="/seasons/:id" component={Season}/>
      </div>
  )}
}

export default App;
