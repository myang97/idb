import React, { Component } from 'react';
import '../styles/App.css';
import { Link, Route } from 'react-router-dom'
import { Button, Grid, Row, Col } from 'react-bootstrap'
import axios from 'axios';

export class Coach extends React.Component {
	
  constructor(props) {
		super(props);
		this.state = { 
	      pic_link: null,
	      position: null,
	      last_name: null,
	      team: null,
	      first_name: null,
	      player_roster: [],
    	};

    	this.insertComma = this.insertComma.bind( this );
	}

	componentDidMount() {
		axios.get("https://nfldb-backend.appspot.com/get/coach/" + this.props.match.params.id, {
      crossdomain: true,
    })
    .then((response) => {
      console.log(response);

      // axios.get('https://nfldb-backend.appspot.com/playerList/' + response.data.team, {
      //   crossdomain: true,
      // }).then((response) => {
      //   this.setState((prevState) => {
      //     let state = prevState
      //     state.player_roster = response.data[0];
      //     return state
      //   });
      // })

      this.setState(() => {
        return {
          pic_link: response.data.pic_link,
          position: response.data.position,
          last_name: response.data.last_name,
          team: response.data.team,
          first_name: response.data.first_name,
          player_roster: response.data.players,
        }
      })
    }).catch(function (error) {
        console.log(error);
    });
	}

	insertComma( idx ) {
		if( this.state.player_roster === null ||
			typeof this.state.player_roster === "undefined" ) {
			return "";
		}

		if( idx < this.state.player_roster.length - 1 ) {
			return ", ";
		}

		return "";
	}

	render() {
		let name = this.state.first_name + " " + this.state.last_name;
		return (
			<div>
				<div class="container-fluid">
					<div class="row text-left">
						<div class="col-lg-2"></div>
						<div class="col-lg-10">
							<h1 class="title"><b>{ name }</b></h1>
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
								<h2 class="instanceinfo" align="left">Coach Information</h2>
								<hr></hr>
								<div>
									<p class="alignleft clearboth"><b>Full Name:</b></p>
									<p class="alignright"><b>{ name }</b></p>
								</div>
								<br></br>
								<div>
									<p class="alignleft clearboth"><b>Position:</b></p>
									<p class="alignright"><b>{ this.state.position }</b></p>
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
								<h2 class="instanceinfo" align="left">Relationships</h2>
								<hr></hr>
								<div>
									<p class="alignleft clearboth"><b>Most Recent Team:</b></p>
									<div class="alignright">
                        				<Link to={`/Teams/${this.state.team}`}>{this.state.team}</Link>
                        			</div>
								</div>
								<br></br>
                <div>
                  <p class="alignleft clearboth"><b>Player Roster:</b></p>
                  <div class="alignright">
                    {this.state.player_roster.map((player, index) => (
                        <Link to={`/players/${player.id}`} key={player.id}>{player.first_name + ' ' + player.last_name + this.insertComma( index )} </Link>
                    ))}
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