import React, { Component } from 'react';
import '../styles/App.css';
import { Link, Route } from 'react-router-dom'
import { Button, Grid, Row, Col } from 'react-bootstrap'
import axios from 'axios';

export class Team extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = { 
			team_alias: null,
      season_losses: null,
      division_rank: null,
      points_rank: null,
      pic_link: null,
      venue_name: null,
      conference: null,
      team_name: null,
      season_wins: null,
      conference_rank: null,
      venue_location: null,
      division: null,
      team_market: null,
      coaches: [],
      players: [],
	  };

	  this.insertComma = this.insertComma.bind( this );
	}

	componentDidMount() {
		
		// axios.get('https://nfldb-backend.appspot.com/coachList/' + this.props.match.params.id, {
  //     crossdomain: true,
  //   })
  //   .then((response) => {
  //     this.setState((prevState) => {
  //       let state = prevState
  //     	state.coaches = response.data[0]
  //       return state
  //     });
  //   }).catch(function (error) {
  //       console.log(error);
  //   });

		// axios.get('https://nfldb-backend.appspot.com/playerList/' + this.props.match.params.id, {
  //     crossdomain: true,
  //   })
  //   .then((response) => {
  //     this.setState((prevState) => {
  //     	let state = prevState
  //     	state.players = response.data[0]
  //       return state
  //     });
  //   }).catch(function (error) {
  //       console.log(error);
  //   });

		axios.get('https://nfldb-backend.appspot.com/teams/' + this.props.match.params.id, {
	      crossdomain: true,
	    })
	    .then((response) => {
	      console.log(response);
	      this.setState((prevState) => {
	        return {
	          team_alias: response.data.team_alias,
			      season_losses: response.data.season_losses,
			      division_rank: response.data.division_rank,
			      points_rank: response.data.points_rank,
			      pic_link: response.data.pic_link,
			      venue_name: response.data.venue_name,
			      conference: response.data.conference,
			      team_name: response.data.team_name,
			      season_wins: response.data.season_wins,
			      conference_rank: response.data.conference_rank,
			      venue_location: response.data.venue_location,
			      division: response.data.division,
			      team_market: response.data.team_market,
			      coaches: response.data.coaches,
			      players: response.data.players,
	        }
	      });
	    }).catch(function (error) {
	        console.log(error);
	    });
	}

	insertComma( listString, idx ) {
		if( listString === "coaches" ) {
			if( this.state.coaches === null ||
				typeof this.state.coaches === "undefined" ) {
				return "";
			}

			if( idx < this.state.coaches.length -1 ) {
				return ", ";
			}
		} else if( listString === "players" ) {
			if( this.state.players === null ||
				typeof this.state.players === "undefined" ) {
				return "";
			}

			if( idx < this.state.players.length -1 ) {
				return ", ";
			}
		}

		return "";
	}

	render() {
		return (
			<div>
				<div class="container-fluid">
					<div class="row text-left">
						<div class="col-lg-2"></div>
						<div class="col-lg-10">
							<h1 class="title"><b>{ this.state.team_name }</b></h1>
						</div>
					</div>
				</div>
				<br></br>

				<div class="container-fluid">
					<div class="row text-center">
						<div class="col-lg-2"></div>
						<div class="col-lg-4">
								<div class="grid">
										<img src={ this.state.pic_link } alt="" />
								</div>
						</div>
						<div class="col-lg-4">
							<div>
								<h2 class="instanceinfo" align="left">Team Information</h2>
								<hr></hr>
								<div>
									<p class="alignleft clearboth"><b>Division:</b></p>
									<p class="alignright"><b>{ this.state.division }</b></p>
								</div>
								<br></br>
								<div>
									<p class="alignleft clearboth"><b>Division Rank:</b></p>
									<p class="alignright"><b>{ this.state.division_rank }</b></p>
								</div>
								<br></br>
								<div>
									<p class="alignleft clearboth"><b>Conference:</b></p>
									<p class="alignright"><b>{ this.state.conference }</b></p>
								</div>
								<br></br>
								<div>
									<p class="alignleft clearboth"><b>Conference Rank:</b></p>
									<p class="alignright"><b>{ this.state.conference_rank }</b></p>
								</div>
								<br></br>
								<div>
									<p class="alignleft clearboth"><b>Arena/Stadium:</b></p>
									<p class="alignright"><b>{ this.state.venue_name }, { this.state.venue_location }</b></p>
								</div>
								<br></br>
								<div>
									<p class="alignleft clearboth"><b>Current Season Wins:</b></p>
									<p class="alignright"><b>{ this.state.season_wins }</b></p>
								</div>
								<br></br>
								<div>
									<p class="alignleft clearboth"><b>Current Season Losses:</b></p>
									<p class="alignright"><b>{ this.state.season_losses }</b></p>
								</div>
								<br></br>
									<div>
										<p class="alignleft clearboth"><b>Coached By:</b></p>
										<div class="alignright">
											{this.state.coaches.map((coach, index) => (
													<Link to={`/coaches/${coach.id}`} key={coach.id}>{coach.first_name + ' ' + coach.last_name + this.insertComma("coaches", index)} </Link>
											))}
										</div>
									</div>
								<br></br>
                <div>
                  <p class="alignleft clearboth"><b>Player Roster:</b></p>
                  <div class="alignright">
                    {this.state.players.map((player, index) => (
                        <Link to={`/players/${player.id}`} key={player.id}>{player.first_name + ' ' + player.last_name + this.insertComma("players", index)} </Link>
                    ))}
                  </div>
                </div>
                <br></br>
							</div>
						</div>
						<div class="col-lg-2"></div>
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