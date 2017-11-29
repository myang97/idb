import React, { Component } from 'react';
import '../styles/App.css';
import { Link, Route } from 'react-router-dom'
import { Button, Grid, Row, Col } from 'react-bootstrap'
import axios from 'axios';

export class Season extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = { 
			nfc_champion: null,
			year: null,
			season_mvp: null,
			super_bowl_mvp: null,
			start_date: null,
			afc_champion: null,
			pic_link: null,
			super_bowl_champion: null,
			end_date: null,
		};

		//Bind the methods for changing state
		this.safeGetName = this.safeGetName.bind( this );
		this.safeGetId = this.safeGetId.bind( this );
	}

	async componentDidMount() {
		await axios.get('https://nfldb-backend.appspot.com/get/season/' + this.props.match.params.id, {
		  crossdomain: true,
		})
		.then((response) => {
		  console.log(response);
		  this.setState(() => {
			return {
				nfc_champion: response.data.nfc_champion,
				year: response.data.year,
				season_mvp: response.data.season_mvp,
				super_bowl_mvp: response.data.super_bowl_mvp,
				start_date: response.data.start_date,
				afc_champion: response.data.afc_champion,
				pic_link: response.data.pic_link,
				super_bowl_champion: response.data.super_bowl_champion,
				end_date: response.data.end_date
			}
		  });
		}).catch(function (error) {
			console.log(error);
		});

		//If the page is 2017, set everything to a default value!
		if( this.props.match.params.id == 31 ) {
			this.setState( () => {
				return {
					nfc_champion: "",
					year: 2017,
					season_mvp: "",
					super_bowl_mvp: "",
					start_date: "2017-09-07",
					afc_champion: "",
					pic_link: "https://upload.wikimedia.org/wikipedia/en/a/a9/Super_Bowl_LII_logo.png",
					super_bowl_champion: "",
					end_date: "TBD"
				}
			});

			//And return since nothing more needs to be done!
			return;
		}
	}

	safeGetName( mvpInfo ) {
		if( mvpInfo === null ||
			!mvpInfo.hasOwnProperty("first_name") ||
			!mvpInfo.hasOwnProperty("last_name") ) {
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

	//Given a player ID (that matches with the backend), retrieves the full name
	//of the appropriate player.
	async getPlayerName( playerId ) {

		if( playerId === null ) {
		  return "";
		}

		var playerName = String(playerId);

		await axios.get('https://nfldb-backend.appspot.com/get/player/' + String(playerId), {
		  crossdomain: true,
		})
		.then((response) => {
		  playerName = response.data.first_name + " " + response.data.last_name;
		})
		.catch(function (error) {
		  console.log(error);
		});

		console.log("Player name: " + playerName);

		return playerName;
	}

	render() {
		let seasonTitle = this.state.year + " Season";
		let duration = this.state.start_date + " to " + this.state.end_date;
		let champ = this.state.afc_champion

		return (
			<div>
				<div class="container-fluid">
					<div class="row text-left">
						<div class="col-lg-2"></div>
						<div class="col-lg-10">
							<h1 class="title"><b>{ seasonTitle }</b><small> { duration }</small></h1>
						</div>
					</div>
				</div>
				<br></br>

				<div class="container-fluid">
					<div class="row text-center">
						<div class="col-lg-2"></div>
						<div class="col-lg-4">
								<div class="grid">
										<img src={ this.state.pic_link }></img>
								</div>
						</div>
						<div class="col-lg-4">
							<div>
								<h2 class="instanceinfo" align="left">Season Results</h2>
								<hr></hr>
								<div>
									<p class="alignleft clearboth"><b>AFC Champion:</b></p>
									<div class="alignright">
									<Link to={`/teams/${this.state.afc_champion}`}>{this.state.afc_champion}</Link>
									</div>
								</div>
								<br></br>
								<div>
									<p class="alignleft clearboth"><b>NFC Champion:</b></p>
									<div class="alignright">
									<Link to={`/teams/${this.state.nfc_champion}`}>{this.state.nfc_champion}</Link>
									</div>
								</div>
								<br></br>
								<div>
									<p class="alignleft clearboth"><b>Super Bowl Champion:</b></p>
									<div class="alignright">
									<Link to={`/teams/${this.state.super_bowl_champion}`}>{this.state.super_bowl_champion}</Link>
									</div>
								</div>
								<br></br>
							</div>
						</div>
						<div class="col-lg-2"></div>
					</div>
				</div>

				<div class="container-fluid">
					<div class="row text-center">
						<div class="col-lg-2"></div>
						<div class="col-lg-5">
							<div>
								<h2 class="instanceinfo" align="left">Most Valuable Players</h2>
								<hr></hr>
								<div>
									<p class="alignleft clearboth"><b>Season MVP:</b></p>
									<div class="alignright">
										<Link to={`/Players/${this.safeGetId(this.state.season_mvp)}`}>{this.safeGetName(this.state.super_bowl_mvp)}</Link>
									</div>
								</div>
								<br></br>
								<div>
									<p class="alignleft clearboth"><b>Super Bowl MVP:</b></p>
									<div class="alignright">
										<Link to={`/Players/${this.safeGetId(this.state.super_bowl_mvp)}`}>{this.safeGetName(this.state.season_mvp)}</Link>
									</div>
								</div>
								<br></br>
							</div>
						</div>
						<div class="col-lg-5"></div>
					</div>
				</div>

				<footer class="footer">
					<div class="col-lg-2"></div>
					<div class="col-lg-5">
						<p>&copy; Company 2017</p>
					</div>
					<div class="col-lg-5"></div>
				</footer>
			</div>
		);
	}
}