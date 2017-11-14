import React, { Component } from 'react';
import '../styles/App.css';
import { Button, Grid, Row, Col, PageHeader, Label, Pagination } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios';


export class Results extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			searchResults: [],

			//Pagination vars
			activePage: 1,
			totalResultsPages: 50,

			//Temp vars
			tempPlayerInfo: [],

			//Final html
			finalHtml: "",

			//Pagination vars
		    activePage: 1,
		    totalResultsPages: 50
		}

		//Pagination vars
		this.maxNumPageButts = 1;

		this.highlightText = this.highlightText.bind( this );
		this.handlePageSelection = this.handlePageSelection.bind( this );
		this.verifyText = this.verifyText.bind( this );
		this.sanitizeBackendInput = this.sanitizeBackendInput.bind( this );
	}

	//What happens on the selection of a page
	async handlePageSelection( eventKey ) {
		//Update the active page on the pagination bar
		await this.setState( {activePage: eventKey} );

		//Get the new data
		await this.getData();
	}

	sanitizeBackendInput() {
		//Verify players input
		for( let player of this.state.searchResults.player_results ) {
			for( let [key, value] of Object.entries(player) ) {
				if( value === null ||
					typeof value === "undefined" ) {
					player[key] = "TBD";
				}
			}
		}

		//verify coaches inputs
		for( let coach of this.state.searchResults.coach_results ) {
			for( let [key, value] of Object.entries(coach) ) {
				if( value === null ||
					typeof value === "undefined" ) {
					coach[key] = "TBD";
				}
			}
		}

		//Verify teams inputs
		for( let team of this.state.searchResults.team_results ) {
			for( let [key, value] of Object.entries(team) ) {
				if( value === null ||
					typeof value === "undefined" ) {
					team[key] = "TBD";
				}
			}
		}

		//Verify seasons inputs
		for( let season of this.state.searchResults.season_results ) {
			for( let [key, value] of Object.entries(season) ) {
				if( value === null ||
					typeof value === "undefined" ) {
					season[key] = "TBD";
				}
			}
		}
	}

	verifyText( sample ) {
		if( sample === null ||
			typeof sample === "undefined" ) {
			return "TBD";
		}

		return sample;
	}

	highlightText( sample ) {

		sample = this.verifyText( sample );

		if( sample === "TBD" ) {
			return sample;
		}

		var origString = String( sample );

		sample = String( sample ).toUpperCase();
		var fullURL = window.location.href;
		var pos = fullURL.lastIndexOf("/") + 1;
		var origQueries = fullURL.substring(pos).split('_');
		var query = fullURL.substring(pos).toUpperCase();
		var queries = query.split('_');
		console.log( "Queries to highlight: " + queries );

		for(var i = 0; i < queries.length; i++){
			if( sample.indexOf( queries[i] ) !== -1 ){
				var idx = sample.indexOf( queries[i] );
				var len = queries[i].length;

				var before = origString.substr(0, idx);
				var after = origString.substr(idx + len);

				console.log( "    Found: \"" + origQueries[i] + "\" in \"" + origString + "\"" );
				console.log( "    Retur: " + before + origQueries[i] + after + " (of type " + typeof (origQueries[i]) + ")" );

				return(
					<div>{before}<Label>{origQueries[i]}</Label>{after}</div>
				);
			}
		}

		return origString;
	}

	async getData() {
		var fullURL = window.location.href;
		var pos = fullURL.lastIndexOf("/") + 1;
		var query = fullURL.substring(pos, fullURL.length);

		var page = this.state.activePage;

		//Get the results
		await axios.get("https://nfldb-backend.appspot.com/search/" + query + "?page=" + page, {
			crossdomain: true,
		})
		.then((response) => {
			console.log(response);
			this.setState(() => {
				return {
					searchResults: response.data
				}
			});
		}).catch(function (error) {
			console.log(error);
		});
	}

	async componentDidMount() {
		console.log('mount');
		await this.getData();
	}

	async componentWillReceiveProps() {
		console.log('will receive props');
		await this.getData();
	}

	render() {

		if( typeof this.state.searchResults.player_results !== "object" ||
			typeof this.state.searchResults.coach_results !== "object" ||
			typeof this.state.searchResults.team_results !== "object" ||
			typeof this.state.searchResults.season_results !== "object" )
		{
			return <p></p>;
		}

		const defaultPage = this.state.activePage > 0 ? this.state.activePage : 1;

		this.sanitizeBackendInput();

		return (

			<div class="container-fluid">

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
		          {this.state.searchResults.player_results.map((player, index) => (
		            <div class="col-lg-4">
		              <div class="grid" key={player.id}>
		                <Link to={"../players/" + player.id}>
		                  <h3><i><b>{ this.highlightText(player.first_name + " " + player.last_name) }</b></i></h3>
		                  <img class="separator" src={player.pic_link} alt="" />
		                  <div class="clearboth"></div>
		                  <div>
		                    <p class="alignleft"><b>Team:</b></p>
		                    <p class="alignright"><b>{ this.highlightText(player.team) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                    <p class="alignleft"><b>Birth Date:</b></p>
		                    <p class="alignright"><b>{ this.highlightText(player.birth_date) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                    <p class="alignleft"><b>Rookie Year:</b></p>
		                    <p class="alignright"><b>{ this.highlightText(player.rookie_year) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                    <p class="alignleft"><b>Jersey:</b></p>
		                    <p class="alignright"><b>{ this.highlightText(player.jersey) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                    <p class="alignleft"><b>Position:</b></p>
		                    <p class="alignright"><b>{ this.highlightText(player.position) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                    <p class="alignleft"><b>Height:</b></p>
		                    <p class="alignright"><b>{ this.highlightText(player.height) } in</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                    <p class="alignleft"><b>Weight:</b></p>
		                    <p class="alignright"><b>{ this.highlightText(player.weight + " lbs") }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                    <p class="alignleft"><b>High School:</b></p>
		                    <p class="alignright"><b>{ this.highlightText(player.high_school) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                </Link>
		              </div>
		            </div>
		          ))}
		        </div>

		        <div class="row text-center">
		          {this.state.searchResults.coach_results.map((coach, index) => (
		            <div class="col-lg-4" key={coach.id}>
		              <div class="grid">
		                 <Link to={"../coaches/" + coach.id}>
		                  <h3><i><b>{ this.highlightText(coach.first_name + " " + coach.last_name) }</b></i></h3>
		                  <img class="separator" src={coach.pic_link}/>
		                  <div class="clearboth"></div>
		                  <div>
		                    <p class="alignleft"><b>Full Name:</b></p>
		                    <p class="alignright"><b>{ this.highlightText(coach.first_name + " " + coach.last_name) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                    <p class="alignleft"><b>Position:</b></p>
		                    <p class="alignright"><b>{ this.highlightText(coach.position) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                    <p class="alignleft"><b>Recent Team:</b></p>
		                    <p class="alignright"><b>{ this.highlightText(coach.team) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                    <p class="alignleft"><b>Hometown:</b></p>
		                    <p class="alignright"><b>{ this.highlightText(coach.hometown) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                    <p class="alignleft"><b>No. Super Bowls:</b></p>
		                    <p class="alignright"><b>{ this.highlightText(coach.no_super_bowl) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                </Link>
		              </div>
		            </div>
		          ))}
		        </div>

		        <div class="row text-center">
		          {this.state.searchResults.team_results.map((team, index) => (
		            <div class="col-lg-4">
		              <div class="grid">
		                <Link to={"../teams/" + team.team_alias}>
		                  <h3><i><b>{ this.highlightText(team.team_name) }</b></i></h3>
		                  <img class="separator" src={team.pic_link} alt="" />
		                  <div class="clearboth"></div>
		                  <div>
		                      <p class="alignleft"><b>Season Wins:</b></p>
		                      <p class="alignright"><b>{ this.highlightText(team.season_wins) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                      <p class="alignleft"><b>Season Losses:</b></p>
		                      <p class="alignright"><b>{ this.highlightText(team.season_losses) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                      <p class="alignleft"><b>Division:</b></p>
		                      <p class="alignright"><b>{ this.highlightText(team.division) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                      <p class="alignleft"><b>Division Rank:</b></p>
		                      <p class="alignright"><b>{ this.highlightText(team.division_rank) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                      <p class="alignleft"><b>Conference:</b></p>
		                      <p class="alignright"><b>{ this.highlightText(team.conference) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                      <p class="alignleft"><b>Conference Rank:</b></p>
		                      <p class="alignright"><b>{ this.highlightText(team.conference_rank) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                      <p class="alignleft"><b>Points Rank:</b></p>
		                      <p class="alignright"><b>{ this.highlightText(team.points_rank) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                      <p class="alignleft"><b>Venue Location:</b></p>
		                      <p class="alignright"><b>{ this.highlightText(team.venue_location) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                      <p class="alignleft"><b>Stadium:</b></p>
		                      <p class="alignright"><b>{ this.highlightText(team.venue_name) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                      <p class="alignleft"><b>Team Market:</b></p>
		                      <p class="alignright"><b>{ this.highlightText(team.team_market) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                </Link>
		              </div>
		            </div>
		          ))}
		        </div>

		        <div class="row text-center">
		          {this.state.searchResults.season_results.map((season, index) => (
		            <div class="col-lg-4" key={season.id}>
		              <div class="grid">
		                <Link to={"../seasons/" + season.id}>
		                  <h3><i><b>{ this.highlightText(season.year) }</b></i></h3>
		                  <img src={season.pic_link} class="separator" alt="..."></img>
		                  <div class="clearboth"></div>
		                  <div>
		                      <p class="alignleft"><b>Dates:</b></p>
		                      <p class="alignright"><b>{ this.highlightText(season.start_date + " to " + season.end_date) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                      <p class="alignleft"><b>Super Bowl Champ:</b></p>
		                      <p class="alignright"><b>{ this.highlightText(season.super_bowl_champion) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                      <p class="alignleft"><b>AFC Champion:</b></p>
		                      <p class="alignright"><b>{ this.highlightText(season.afc_champion) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                      <p class="alignleft"><b>NFC Champion:</b></p>
		                      <p class="alignright"><b>{ this.highlightText(season.nfc_champion) }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                      <p class="alignleft"><b>Super Bowl MVP:</b></p>
		                      <p class="alignright"><b>{ this.highlightText(season.year + " Super Bowl MVP") }</b></p>
		                  </div>
		                  <div class="clearboth"></div>
		                  <div>
		                      <p class="alignleft"><b>Season MVP:</b></p>
		                      <p class="alignright"><b>{ this.highlightText(season.year + " Season MVP") }</b></p>
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

			</div>

			
		);
	}

}
