import React, { Component } from 'react';
import '../styles/App.css';
import { Button, Navbar, Nav, NavDropdown, MenuItem, NavItem, Grid, Row, Col } from 'react-bootstrap'

export const Teams = props => {
  return (
      <Grid>
      <Row className="show-grid">
        <Col xs={6} md={4}><code>&lt;{'teams'} /&gt;</code></Col>
        <Col xs={6} md={4}><code>&lt;{'b'} /&gt;</code></Col>
        <Col xs={6} md={4}><code>&lt;{'c'} /&gt;</code></Col>
      </Row>

      <Row className="show-grid">
        <Col xs={6} md={4}><code>&lt;{'a'} /&gt;</code></Col>
        <Col xs={6} md={4}><code>&lt;{'b'} /&gt;</code></Col>
        <Col xs={6} md={4}><code>&lt;{'c'} /&gt;</code></Col>
      </Row>

      <Row className="show-grid">
        <Col xs={6} md={4}><code>&lt;{'a'} /&gt;</code></Col>
        <Col xs={6} md={4}><code>&lt;{'b'} /&gt;</code></Col>
        <Col xs={6} md={4}><code>&lt;{'c'} /&gt;</code></Col>
      </Row>

      <Row className="show-grid">
        <Col xs={6} md={4}><code>&lt;{'a'} /&gt;</code></Col>
        <Col xs={6} md={4}><code>&lt;{'b'} /&gt;</code></Col>
        <Col xs={6} md={4}><code>&lt;{'c'} /&gt;</code></Col>
      </Row>
    </Grid>
)};