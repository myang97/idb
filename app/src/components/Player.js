import React, { Component } from 'react';
import '../styles/App.css';
import { Button, Navbar, Nav, NavDropdown, MenuItem, NavItem, Grid, Row, Col } from 'react-bootstrap'
import axios from 'axios';

export class Player extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			birth_date: null,
	    last_name: null,
	    pic_link: null,
	    team: null,
	    jersey: null,
	    height: null,
	    high_school: null,
	    first_name: null,
	    rookie_year: null,
	    position: null,
	    weight: null,
	  };
	}

	componentDidMount() {

		axios.get('https://cors-anywhere.herokuapp.com/https://nfldb-backend.appspot.com/players/${this.props.match.params.id}', {
      crossdomain: true,
    })
    .then(function (response) {
      console.log(response);
      this.setState(() => {
        return {
          birth_date: response.birth_date,
			    last_name: response.last_name,
			    pic_link: response.pic_link,
			    team: response.team,
			    jersey: response.jersey,
			    height: response.height,
			    high_school: response.high_school,
			    first_name: response.first_name,
			    rookie_year: response.rookie_year,
			    position: response.position,
			    weight: response.weight,
        }
      });
    }).catch(function (error) {
        console.log(error);
    });
	}

	render() {
		return (
		<div>
			<div class="container-fluid">
				<div class="row text-left">
					<div class="col-lg-2"></div>
					<div class="col-lg-10">
						<h1 class="title"><b>{ this.name }</b></h1>
					</div>
				</div>
				<div class="row text-left">
					<div class="col-lg-2"></div>
					<div class="col-lg-10">
						<h3 class="title">Jersey #{ this.jersey }</h3>
					</div>
				</div>
			</div>
			<br></br>

			<div class="container-fluid">
				<div class="row text-center">
					<div class="col-lg-2"></div>
					<div class="col-lg-4">
							<div class="grid">
									<img src={ this.pic_link } alt="" />
							</div>
					</div>
					<div class="col-lg-4">
						<div>
							<h2 class="instanceinfo" align="left">Player Information</h2>
							<hr></hr>
							<div>
								<p class="alignleft clearboth"><b>Position:</b></p>
								<p class="alignright"><b>{ this.position }</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>Age:</b></p>
								<p class="alignright"><b>{ this.age } Years</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>Experience:</b></p>
								<p class="alignright"><b>{ this.rookie_year } Seasons</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>Height:</b></p>
								<p class="alignright"><b>{ this.height }ft { this.height }in</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>Weight:</b></p>
								<p class="alignright"><b>{ this.weight } lb</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>College:</b></p>
								<p class="alignright"><b>{ this.high_school }</b></p>
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
								<p class="alignright"><b>{ this.team }</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>Coached By:</b></p>
								<p class="alignright"><b>{ this.team }</b></p>
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
	)};
};