import React, { Component } from 'react';
import '../styles/App.css';
import { Link, Route } from 'react-router-dom'
import { Button, Grid, Row, Col, Pagination } from 'react-bootstrap'
import axios from 'axios';
import Dropdown from '../DropdownIndex.js';

export class Teams extends React.Component {

  constructor(props) {
    super(props);

    this.sortOptions =
      [ 'Name (A-Z)', 'Name (Z-A)' ];

    this.filterOptions =
      [
        'None',
        {
          type: 'group', name: '----------', items:
          [
            { value: 'top16'    , label: 'Top 16'     },
            { value: 'bottom16' , label: 'Bottom 16'  }
          ]
        }
      ];

    this.state = {
      teams: [],

      //Filter vars
      filterSelected: { "value": "", "label": "None" },

      //Sorting vars
      sortSelected: { "value": "ascending", "label": "Name (A-Z)" },

      //Pagination vars
      activePage: 1,
      totalResultsPages: 50

    };

    //Pagination vars
    this.maxNumPageButts = 1;

    //Bind the methods for changing state
    this.onSortSelect = this.onSortSelect.bind( this );
    this.onFilterSelect = this.onFilterSelect.bind( this );
    this.handlePageSelection = this.handlePageSelection.bind( this );
  }

  //What happens on the select of the sort dropdown menu
  async onSortSelect( sortOption ) {
    console.log( "User selected the ", sortOption.label, " sort" );
    
    if( sortOption == this.state.sortSelected )
    {
      return;
    }

    //Force the program to wait for the state to update
    await this.setState( {sortSelected: sortOption, activePage: 1} );

    await this.getData();
  }

  //What happens on the select of the filter dropdown menu
  async onFilterSelect( filterOption ) {
    console.log( "User selected the ", filterOption.label, " filter" );

    if( filterOption == this.state.filterSelected )
    {
      return;
    }

    //Force the program to wait for the state to update
    await this.setState( {filterSelected: filterOption, activePage: 1} );

    await this.getData();
  }

  //What happens on the selection of a page
  async handlePageSelection( eventKey ) {
    //Update the active page on the pagination bar
    await this.setState( {activePage: eventKey} );

    //Get the new data
    await this.getData();
  }

  getData() {

    var typeOfSort = "";

    switch(this.state.sortSelected.label) {
      case "Name (A-Z)":
        typeOfSort = "ascending";
        break;

      case "Name (Z-A)":
        typeOfSort = "descending";
        break;

      default:
        typeOfSort = "ascending";
        break;

    }

    var typeOfFilter = "";
    if( this.state.filterSelected.label === "None" ) {
      typeOfFilter = "";
    } else {
      typeOfFilter = this.state.filterSelected.value;
    }

    var sort = "order=" + typeOfSort;
    var filter = "filter=" + typeOfFilter;
    var page = "page=" + this.state.activePage;

    //TODO: Use the sort and filter variables to make a request!
    axios.get('https://nfldb-backend.appspot.com/teams?' + sort + "&" + filter + "&" + page, {
      crossdomain: true,
    })
    .then((response) => {
      console.log(response);
      this.setState(() => {
        return {
          teams: response.data
        }
      });
    }).catch(function (error) {
        console.log(error);
    });

  }

  componentDidMount() {

    this.getData();
    
  }

  render() {
    const defaultSortOption = this.state.sortSelected;
    const sortPlaceHolderValue = typeof this.state.sortSelected === 'string' ?
      this.state.sortSelected : this.state.sortSelected.label;

    const defaultFilterOption = this.state.filterSelected;
    const filterPlaceHolderValue = typeof this.state.filterSelected === 'string' ?
      this.state.filterSelected : this.state.filterSelected.label;
    const defaultPage = this.state.activePage > 0 ? this.state.activePage : 1;

    return (
      <div class="container-fluid">
        <div class="row text-center">
          <div class="col-lg-1"></div>
            <div class="col-lg-4 text-left">
            <h1 class="title">Teams</h1>
          </div>
          <div class="col-lg-2 text-left">
            <br />
            <b>Sort by:</b>
            <Dropdown options={this.sortOptions} onChange={this.onSortSelect} value={defaultSortOption} placeholder={sortPlaceHolderValue} />
          </div>
          <div class="col-lg-2 text-left">
            <br />
            <b>Filter by:</b>
            <Dropdown options={this.filterOptions} onChange={this.onFilterSelect} value={defaultFilterOption} placeholder={filterPlaceHolderValue } />
          </div>
          <div class="col-lg-3"></div>
        </div>

        <div class="row text-center">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <Pagination
              prev
              next
              ellipsis = {false}
              items = {this.state.totalResultsPages}
              maxButtons={this.maxNumPageButts}
              activePage={defaultPage}
              onSelect={this.handlePageSelection}>
            </Pagination>
          </div>
          <div class="col-lg-4"></div>
        </div>

        <div class="row text-center">
          {this.state.teams.map((team, index) => (
            <div class="col-lg-4">
              <div class="grid">
                <Link to={"teams/" + team.team_alias}>
                  <h3><i><b>{team.team_name}</b></i></h3>
                  <img class="separator" src={team.pic_link} alt="" />
                  <div class="clearboth"></div>
                  <div>
                      <p class="alignleft"><b>Stadium:</b></p>
                      <p class="alignright"><b>{team.venue_name}</b></p>
                  </div>
                  <div class="clearboth"></div>
                  <div>
                      <p class="alignleft"><b>Division:</b></p>
                      <p class="alignright"><b>{team.division}</b></p>
                  </div>
                  <div class="clearboth"></div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div class="row text-center">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <Pagination
              prev
              next
              ellipsis = {false}
              items = {this.state.totalResultsPages}
              maxButtons={this.maxNumPageButts}
              activePage={defaultPage}
              onSelect={this.handlePageSelection}>
            </Pagination>
          </div>
          <div class="col-lg-4"></div>
        </div>
        
        <footer class="footer">
          <p>&copy; Company 2017</p>
        </footer>
      </div>
    );
  }
}