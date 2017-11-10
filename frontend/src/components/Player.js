import React, { Component } from 'react';
import '../styles/App.css';
import { Link, Route } from 'react-router-dom'
import { Button, Grid, Row, Col } from 'react-bootstrap'
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
	    coaches: [],
	  };
	}

	componentDidMount() {

		axios.get('https://nfldb-backend.appspot.com/players/' + this.props.match.params.id, {
      crossdomain: true,
    })
    .then((response) => {
      console.log(response);
      axios.get('https://nfldb-backend.appspot.com/coachList/' + response.data.team, {
	      crossdomain: true,
	    }).then((response) => {
	    	this.setState((prevState) => {
	    		let state = prevState
	    		state.coaches = response.data[0];
	    		return state
	    	});
	    })
      this.setState(() => {
        return {
          birth_date: response.data.birth_date,
			    last_name: response.data.last_name,
			    pic_link: response.data.pic_link,
			    team: response.data.team,
			    jersey: response.data.jersey,
			    height: response.data.height,
			    high_school: response.data.high_school,
			    first_name: response.data.first_name,
			    rookie_year: response.data.rookie_year,
			    position: response.data.position,
			    weight: response.data.weight,
			    coaches: [],
        }
      });
    }).catch(function (error) {
        console.log(error);
    });
	}

	render() {
		console.log(this.state);
		return (
		<div>
			<div class="container-fluid">
				<div class="row text-left">
					<div class="col-lg-2"></div>
					<div class="col-lg-10">
						<h1 class="title"><b>{this.state.first_name} {this.state.last_name}</b></h1>
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
							<h2 class="instanceinfo" align="left">Player Information</h2>
							<hr></hr>
							<div>
								<p class="alignleft clearboth"><b>Position:</b></p>
								<p class="alignright"><b>{ this.state.position }</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>Jersey:</b></p>
								<p class="alignright"><b>{ this.state.jersey }</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>DOB:</b></p>
								<p class="alignright"><b>{this.state.birth_date}</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>Experience:</b></p>
								<p class="alignright"><b>{ this.state.rookie_year } - Present</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>Height:</b></p>
								<p class="alignright"><b>{this.state.height} in</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>Weight:</b></p>
								<p class="alignright"><b>{ this.state.weight } lb</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>High School:</b></p>
								<p class="alignright"><b>{ this.state.high_school }</b></p>
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
								<p class="alignleft clearboth"><b>Coached By:</b></p>
								<div class="alignright">
									{this.state.coaches.map((coach, index) => (
											<Link to={`/coaches/${coach.id}`} key={coach.id}>{coach.first_name + ' ' + coach.last_name} </Link>
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
	)};
};