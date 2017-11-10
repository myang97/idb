import React, { Component } from 'react';
import { FormGroup, FormControl, Glyphicon, Button } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom'
import { browserHistory, withRouter } from 'react-router';
import { Redirect } from 'react-router'

class SearchBox extends React.Component {
  constructor(props){
    super();
    this.state = {
      fireRedirect: false,
      search_entry: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(event) {
    this.setState({search_entry: event.target.value});
  }

  handleKeyDown(event) {
    if (event.key == ' ') {
      this.setState( (prevState) => {
        return {
          search_entry: prevState.search_entry + ' '
        };
      })
    } else if (event.key == 'Enter') {
      this.handleSubmit(event);
    }
  }

  handleSubmit(event){
      event.preventDefault();
      var searchEndPoint = this.state.search_entry
      // window.location.reload()
      this.props.history.push("/results/" + searchEndPoint.replace(' ', '_'));
      this.setState({search_entry: ''})
  }

  render() {
    return(
      <div>
        <FormControl  type="search" 
                      value={this.state.search_entry} 
                      placeholder="Search..."
                      onKeyDown={this.handleKeyDown}
                      onChange={this.handleChange} />
        <FormControl.Feedback />
        </div>
    )
  }
}

export default withRouter(SearchBox);