import React, { Component } from 'react';
import '../styles/App.css';
import { Button, Navbar, Nav, NavDropdown, MenuItem, NavItem, Grid, Row, Col } from 'react-bootstrap'
import axios from 'axios';

export class Players extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      players: null
    };
  }

  componentDidMount() {
    axios.get('https://cors-anywhere.herokuapp.com/https://nfldb-backend.appspot.com/players', {
      crossdomain: true,
    })
    .then(function (response) {
      console.log(response);
      this.setState(() => {
        return {
          players: response
        }
      });
    }).catch(function (error) {
        console.log(error);
    });
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={6} md={4}><code>&lt;{'players'} /&gt;</code></Col>
          <Col xs={6} md={4}><code>&lt;{'2'} /&gt;</code></Col>
          <Col xs={6} md={4}><code>&lt;{'3'} /&gt;</code></Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6} md={4}><code>&lt;{'1'} /&gt;</code></Col>
          <Col xs={6} md={4}><code>&lt;{'2'} /&gt;</code></Col>
          <Col xs={6} md={4}><code>&lt;{'3'} /&gt;</code></Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6} md={4}><code>&lt;{'1'} /&gt;</code></Col>
          <Col xs={6} md={4}><code>&lt;{'2'} /&gt;</code></Col>
          <Col xs={6} md={4}><code>&lt;{'3'} /&gt;</code></Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6} md={4}><code>&lt;{'1'} /&gt;</code></Col>
          <Col xs={6} md={4}><code>&lt;{'2'} /&gt;</code></Col>
          <Col xs={6} md={4}><code>&lt;{'3'} /&gt;</code></Col>
        </Row>
      </Grid>
  )}
};