import React, { Component } from 'react';
import '../styles/App.css';
import { Button, Navbar, Nav, NavDropdown, MenuItem, NavItem, Grid, Row, Col } from 'react-bootstrap'

export const Coach = props => {
  return (
      <Grid>
      <Row className="show-grid">
        <Col xs={6} md={4}><code>&lt;{'coach'} /&gt;</code></Col>
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
)};