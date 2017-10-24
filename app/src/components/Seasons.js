import React, { Component } from 'react';
import '../styles/App.css';
import { Button, Navbar, Nav, NavDropdown, MenuItem, NavItem, Grid, Row, Col } from 'react-bootstrap'

export const Seasons = props => {
  return (
      <Grid>
      <Row className="show-grid">
        <Col xs={6} md={4}><code>&lt;{'seasons'} /&gt;</code></Col>
        <Col xs={6} md={4}><code>&lt;{'10'} /&gt;</code></Col>
        <Col xs={6} md={4}><code>&lt;{'11'} /&gt;</code></Col>
      </Row>

      <Row className="show-grid">
        <Col xs={6} md={4}><code>&lt;{'9'} /&gt;</code></Col>
        <Col xs={6} md={4}><code>&lt;{'10'} /&gt;</code></Col>
        <Col xs={6} md={4}><code>&lt;{'11'} /&gt;</code></Col>
      </Row>

      <Row className="show-grid">
        <Col xs={6} md={4}><code>&lt;{'9'} /&gt;</code></Col>
        <Col xs={6} md={4}><code>&lt;{'10'} /&gt;</code></Col>
        <Col xs={6} md={4}><code>&lt;{'11'} /&gt;</code></Col>
      </Row>

      <Row className="show-grid">
        <Col xs={6} md={4}><code>&lt;{'9'} /&gt;</code></Col>
        <Col xs={6} md={4}><code>&lt;{'10'} /&gt;</code></Col>
        <Col xs={6} md={4}><code>&lt;{'11'} /&gt;</code></Col>
      </Row>
    </Grid>
)};