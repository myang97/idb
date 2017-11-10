import React, { Component } from 'react';
import '../styles/App.css';
import { Button, Grid, Row, Col, PageHeader } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export class Splash extends React.Component {

	render() {
		return (
			<div>
				<div class="row">
					<div class="col-lg-2"></div>
					<div class="col-lg-8">
						<div class="jumbotron"></div>
					</div>
					<div class="col-lg-2"></div>
				</div>

				<div class="row text-center">
					<div class="col-lg-2"></div>
					<div class="col-lg-8third">
						<p>
							There are two conferences in the NFL, the American Football League and the National Football League.
							Each league is comprised of 16 teams, resulting in 32 teams total. Click below to view the different teams.
						</p>
						<p>
							<a class="btn btn-primary" role="button">
								<Link to="/teams">View Team Details &raquo;</Link>
							</a>
						</p>
					</div>
					<div class="col-lg-8third">
						<p>
							Each team in the NFL has one head coach and up to 53 players in their active roster. Click below to view the
							thousands of players and hundreds of head coaches.
						</p>
						<p>
							<a class="btn btn-primary" role="button">
								<Link to="/players">View Player Details &raquo;</Link>
							</a>
						</p>
						<p>
							<a class="btn btn-primary" role="button">
								<Link to="/coaches">View Coach Details &raquo;</Link>
							</a>
						</p>
					</div>
					<div class="col-lg-8third">
						<p>
							The NFL was formed in 1920 and the two conferences were created in 1970. The first Super Bowl Championship
							occurred in 1967 and has continued since. Click below to view every season stats.
						</p>
						<p>
							<a class="btn btn-primary" role="button">
								<Link to="/seasons">View Season Details &raquo;</Link>
							</a>
						</p>
					</div>
					
					<div class="col-lg-2"></div>
				</div>

				<footer class="footer">
					<p>&copy; Company 2017</p>
				</footer>
			</div>
		);
	}

}
