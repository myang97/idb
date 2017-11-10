import React, { Component } from 'react';
import '../styles/App.css';
import { Link, Route } from 'react-router-dom'
import { Navbar, Nav, NavItem, FormGroup, FormControl, Button, Glyphicon} from 'react-bootstrap'
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
import { Results } from './Results.js'
import SearchBox from './SearchBox.js'

const NavInstance = () => {
  return (
    <Navbar inverse collapseOnSelect style={{width: "100%", height: 110}}>
    <Navbar.Header>
      <Navbar.Brand>
      <Link to="/">
          <img src={ require("../assets/nfl-search-logo.png") } style={{width: 90, height: 110}}/>
      </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav bsStyle="pills">
        <NavItem class="navitem"> 
          <Link to="/players">Players</Link>
        </NavItem>
        <NavItem class="navitem">
          <Link to="/teams">Teams</Link>
        </NavItem>
        <NavItem class="navitem">
          <Link to="/coaches">Coaches</Link>
        </NavItem>
        <NavItem class="navitem">
          <Link to="/seasons">Seasons</Link>
        </NavItem>
        <NavItem class="navitem">
          <Link to="/about">About</Link>
        </NavItem>
      </Nav>

      <Nav bsStyle pullRight={true}>

      <NavItem class="searchBar">
        <SearchBox />
      </NavItem>
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
        <Route exact path="/results/:id" component={Results}/>
      </div>
  )}
}


export default App;
