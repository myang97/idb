import React, { Component } from 'react';
import '../styles/App.css';
import { Button, Navbar, Nav, NavDropdown, MenuItem, NavItem, Grid, Row, Col } from 'react-bootstrap'

export const Player = props => {
	
	let name = "<insrt nam>";
	let jerseyNum = -17;
	let imageUrl = "https://gotomydevices.com/media/home/icons/Icon_Fluid_Temp.png";
	let position = "Nickleback";
	let age = -12;
	let experience = -1;
	let heightFeet = 2;
	let heightInches = 4;
	let weight = 45;
	let college = "Yopio Universi-College";

	let recentTeam = "Your Face Tigers";
	let coachedBy = "Quintessential Moistman";

	return (
		<div>
			<div class="container-fluid">
				<div class="row text-left">
					<div class="col-lg-2"></div>
					<div class="col-lg-10">
						<h1 class="title"><b>{ name }</b></h1>
					</div>
				</div>
				<div class="row text-left">
					<div class="col-lg-2"></div>
					<div class="col-lg-10">
						<h3 class="title">Jersey #{ jerseyNum }</h3>
					</div>
				</div>
			</div>
			<br></br>

			<div class="container-fluid">
				<div class="row text-center">
					<div class="col-lg-2"></div>
					<div class="col-lg-4">
							<div class="grid">
									<img src={ imageUrl } alt="" />
							</div>
					</div>
					<div class="col-lg-4">
						<div>
							<h2 class="instanceinfo" align="left">Player Information</h2>
							<hr></hr>
							<div>
								<p class="alignleft clearboth"><b>Position:</b></p>
								<p class="alignright"><b>{ position }</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>Age:</b></p>
								<p class="alignright"><b>{ age } Years</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>Experience:</b></p>
								<p class="alignright"><b>{ experience } Seasons</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>Height:</b></p>
								<p class="alignright"><b>{ heightFeet }ft { heightInches }in</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>Weight:</b></p>
								<p class="alignright"><b>{ weight } lb</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>College:</b></p>
								<p class="alignright"><b>{ college }</b></p>
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
								<p class="alignright"><b>{ recentTeam }</b></p>
							</div>
							<br></br>
							<div>
								<p class="alignleft clearboth"><b>Coached By:</b></p>
								<p class="alignright"><b>{ coachedBy }</b></p>
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
};

/*
<Grid>
	<Row className="show-grid">
		<Col xs={6} md={4}><code>&lt;{'player'} /&gt;</code></Col>
		<Col xs={6} md={4}><code>&lt;{'2'} /&gt;</code></Col>
		<Col xs={6} md={4}><code>&lt;{'3'} /&gt;</code></Col>
	</Row>

	<Row className="show-grid">
		<Col xs={6} md={4}><code>&lt;{'1'} /&gt;</code></Col>
		<Col xs={6} md={4}><code>&lt;{'2'} /&gt;</code></Col>
		<Col xs={6} md={4}><code>&lt;{'3'} /&gt;</code></Col>
	</Row>

	<Row className="show-grid">
		<Col xs={6} md={4}><code>&lt;{'1'} /&gt;</code></Col>
		<Col xs={6} md={4}><code>&lt;{'2'} /&gt;</code></Col>
		<Col xs={6} md={4}><code>&lt;{'3'} /&gt;</code></Col>
	</Row>

	<Row className="show-grid">
		<Col xs={6} md={4}><code>&lt;{'1'} /&gt;</code></Col>
		<Col xs={6} md={4}><code>&lt;{'2'} /&gt;</code></Col>
		<Col xs={6} md={4}><code>&lt;{'3'} /&gt;</code></Col>
	</Row>
</Grid>
*/