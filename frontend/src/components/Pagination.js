import React, { Component } from 'react';
import '../styles/App.css';
import { Link, Route } from 'react-router-dom'
import { Button, Grid, Row, Col } from 'react-bootstrap'

export default class Pagination extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      pageSize: 10,
    };
    this.backClicked = this.backClicked.bind(this);
    this.forwardClicked = this.forwardClicked.bind(this);
  }

  backClicked() {
    this.setState( (prevState) => {
      return {
        offset: prevState.offset - prevState.pageSize,
        pageSize: prevState.pageSize,
      }
    }, () => {
      this.props.getData(this.state.offset, this.state.pageSize);
    });
  }

  forwardClicked() {
    this.setState( (prevState) => {
      return {
        offset: prevState.offset + prevState.pageSize,
        pageSize: prevState.pageSize,
      }
    }, () => {
      this.props.getData(this.state.offset, this.state.pageSize);
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.backClicked}> back </Button>

        <p>{this.state.offset/this.state.pageSize + 1}</p>

        <Button onClick={this.forwardClicked}> forward </Button>
      </div>
    );  
  }
}