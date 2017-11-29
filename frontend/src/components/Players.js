import React, { Component } from 'react';
import '../styles/App.css';
import { Link, Route } from 'react-router-dom'
import { Button, Grid, Row, Col, Pagination } from 'react-bootstrap'
import axios from 'axios';
import Dropdown from '../DropdownIndex.js';

export class Players extends React.Component {

  constructor(props) {
    super(props);

    this.sortOptions =
      [ 'Name (A-Z)', 'Name (Z-A)' ];

    this.filterOptions =
      [
        'None',
        {
          type: 'group', name: 'Team', items: [
            { value: 'SF' , label: '49ers'      },
            { value: 'CHI', label: 'Bears'      },
            { value: 'CIN', label: 'Bengals'    },
            { value: 'BUF', label: 'Bills'      },
            { value: 'DEN', label: 'Broncos'    },
            { value: 'CLE', label: 'Browns'     },
            { value: 'ARI', label: 'Cardinals'  },
            { value: 'LAC', label: 'Chargers'   },
            { value: 'KC' , label: 'Chiefs'     },
            { value: 'IND', label: 'Colts'      },
            { value: 'DAL', label: 'Cowboys'    },
            { value: 'MIA', label: 'Dolphins'   },
            { value: 'PHI', label: 'Eagles'     },
            { value: 'ATL', label: 'Falcons'    },
            { value: 'NYG', label: 'Giants'     },
            { value: 'JAC', label: 'Jaguars'    },
            { value: 'NYJ', label: 'Jets'       },
            { value: 'DET', label: 'Lions'      },
            { value: 'GB' , label: 'Packers'    },
            { value: 'CAR', label: 'Panthers'   },
            { value: 'NEP', label: 'Patriots'   },
            { value: 'OAK', label: 'Raiders'    },
            { value: 'LAR', label: 'Rams'       },
            { value: 'BAL', label: 'Ravens'     },
            { value: 'WAS', label: 'Redskins'   },
            { value: 'NO' , label: 'Saints'     },
            { value: 'SEA', label: 'Seahawks'   },
            { value: 'PIT', label: 'Steelers'   },
            { value: 'TB' , label: 'Tampa Bay'  },
            { value: 'HOU', label: 'Texans'     },
            { value: 'TEN', label: 'Titans'     },
            { value: 'MIN', label: 'Vikings'    },
          ]
        }
      ];

    this.state = {
      players: [],

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
    this.safeRequire = this.safeRequire.bind( this );
  }

//TODO: fix escaping of height, links to use react router dom

  //What happens on the select of the sort dropdown menu
  async onSortSelect( sortOption ) {
    console.log( "User selected the " + sortOption.label + " sort" );
    
    if( sortOption == this.state.sortSelected )
    {
      return;
    }

    //Force the program to wait for the state to update
    await this.setState( {sortSelected: sortOption, activePage: 1} );

    await this.getData();

    //Set the temp var to a result!
    await this.setState( {tempString: this.state.players} );
  }

  //What happens on the select of the filter dropdown menu
  async onFilterSelect( filterOption ) {
    console.log( "User selected the " + filterOption.label + " filter" );

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

    if( this.state.filterSelected.label !== "None" )
      typeOfFilter = this.state.filterSelected.value;
    else
      typeOfFilter = "";

    var sort = "order=" + typeOfSort;
    var page = "page=" + this.state.activePage;
    var filter = "";
    if( typeOfFilter.length > 0 ) {
      filter = "filter=" + typeOfFilter;
    }

    //TODO: Use the sort and filter variables to make a request!
    axios.get('https://nfldb-backend.appspot.com/players?' + sort + "&" + filter + "&" + page, {
      crossdomain: true,
    })
    .then((response) => {
      console.log(response);
      this.setState(() => {
        return {
          players: response.data
        }
      });
    }).catch(function (error) {
        console.log(error);
    });
  }

  safeRequire( picPath ) {

    console.log( "Curr path: " + String(picPath) );

    if( picPath === null || String(picPath) === "."
        || String(picPath).length < 10 ) {
      return "";
    }

    //Else, we can require it!
    return require( String(picPath) );
  }

  async componentDidMount() {
    
    await this.getData();

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
      <div>
      <div class="container-fluid">
        <div class="row text-center">
          <div class="col-lg-1"></div>
          <div class="col-lg-4 text-left">
            <h1 class="title">Players</h1>
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
          {this.state.players.map((player, index) => (
            <div class="col-lg-4">
              <div class="grid" key={player.id}>
                <Link to={"players/" + player.id}>
                  <h3><i><b>{player.first_name + " " + player.last_name}</b></i></h3>
                  <img class="separator" src={player.pic_link} alt="" />
                  <div class="clearboth"></div>
                  <div>
                    <p class="alignleft"><b>Position:</b></p>
                    <p class="alignright"><b>{player.position}</b></p>
                  </div>
                  <div class="clearboth"></div>
                  <div>
                    <p class="alignleft"><b>Height:</b></p>
                    <p class="alignright"><b>{player.height} in</b></p>
                  </div>
                  <div class="clearboth"></div>
                  <div>
                    <p class="alignleft"><b>Weight:</b></p>
                    <p class="alignright"><b>{player.weight + " lbs"}</b></p>
                  </div>
                  <div class="clearboth"></div>
                  <div>
                    <p class="alignleft"><b>High School:</b></p>
                    <p class="alignright"><b>{player.high_school}</b></p>
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
      </div>
  )};
}