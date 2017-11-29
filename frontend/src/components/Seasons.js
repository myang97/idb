import React, { Component } from 'react';
import '../styles/App.css';
import { Link, Route } from 'react-router-dom'
import { Button, Grid, Row, Col, Pagination } from 'react-bootstrap'
import axios from 'axios';
import Dropdown from '../DropdownIndex.js';

export class Seasons extends React.Component {

  constructor(props) {
    super(props);

    this.sortOptions =
      [ 'Year (oldest)', 'Year (recent)' ];

    this.filterOptions =
      [ 'None', 'AFC SB Champion', 'NFC SB Champion' ];

    this.state = {
      seasons: [],

      //Filter vars
      filterSelected: { "value": "", "label": "None" },

      //Sorting vars
      sortSelected: { "value": "ascending", "label": "Year (oldest)" },

      //Pagination vars
      activePage: 1,
      totalResultsPages: 50,
      remaining: 0

    };

    //Pagination vars
    this.maxNumPageButts = 5;

    //Bind the methods for changing state
    this.onSortSelect = this.onSortSelect.bind( this );
    this.onFilterSelect = this.onFilterSelect.bind( this );
    this.handlePageSelection = this.handlePageSelection.bind( this );
    this.safeGetName = this.safeGetName.bind( this );
    this.safeGetId = this.safeGetId.bind( this );
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

  async getData() {

    var typeOfSort = "";

    switch(this.state.sortSelected.label) {
      case "Year (oldest)":
        typeOfSort = "ascending";
        break;

      case "Year (recent)":
        typeOfSort = "descending";
        break;

      default:
        typeOfSort = "ascending";
        break;

    }

    var typeOfFilter = "";

    if( this.state.filterSelected.label !== "None" ) {
      if( this.state.filterSelected.label.indexOf( "AFC" ) !== -1 ) {
        typeOfFilter = "afc";
      } else if( this.state.filterSelected.label.indexOf( "NFC" ) !== -1 ) {
        typeOfFilter = "nfc";
      }
    }
    else {
      typeOfFilter = "";
    }

    var sort = "order=" + typeOfSort;
    var page = "page=" + this.state.activePage;
    var filter = "";
    if( typeOfFilter.length > 0 ) {
      filter = "filter=" + typeOfFilter;
    }

    var seasonsCopy = {};
    var rem = 0;

    await axios.get('https://nfldb-backend.appspot.com/seasons?' + sort + "&" + filter + "&" + page, {
      crossdomain: true,
    })
    .then((response) => {
      console.log(response);
      this.setState(() => {
        return {
          seasons: response.data.items,
          remaining: response.data.remaining
        }
      });
    }).catch(function (error) {
        console.log(error);
    });

    //Set the maximum buttons in the Pagination
    var maxPages = ((this.state.activePage * 12) + this.state.remaining) / 12.0
    maxPages = Math.ceil(maxPages) - 1;

    this.setState( {totalResultsPages: maxPages} );
  }

  safeGetName( mvpInfo ) {
    if( mvpInfo === null ) {
      return "";
    }

    return mvpInfo.first_name + " " + mvpInfo.last_name;
  }

  safeGetId( mvpInfo ) {
    if( mvpInfo === null ) {
      return 1;
    }

    return mvpInfo.id;
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
            <h1 class="title">Seasons</h1>
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
          {this.state.seasons.map((season, index) => (
            <div class="col-lg-4" key={season.id}>
              <div class="grid">
                <Link to={"seasons/" + season.id}>
                  <h3><i><b>{season.year}</b></i></h3>
                  <img src={season.pic_link} class="separator" alt="..."></img>

                  <div class="clearboth"></div>
                  <div>
                    <p class="alignleft"><b>Super Bowl Champ:</b></p>
                  <div class="alignright">
                  <Link to={`/Teams/${season.super_bowl_champion}`}><b>{season.super_bowl_champion}</b></Link>
                  </div>
                  </div>
                  <div class="clearboth"></div>
                  <div>
                    <p class="alignleft"><b>Super Bowl MVP:</b></p>

                    <div class="alignright">
                    <Link to={`/Players/${this.safeGetId(season.super_bowl_mvp)}`}><b>{this.safeGetName(season.super_bowl_mvp)}</b></Link>
                    </div>
                  </div>
                  <div class="clearboth"></div>
                  <div>
                    <p class="alignleft"><b>Season MVP:</b></p>
                    <div class="alignright">
                      <Link to={`/Players/${this.safeGetId(season.season_mvp)}`}><b>{this.safeGetName(season.season_mvp)}</b></Link>
                    </div>
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
    )
  };
}
