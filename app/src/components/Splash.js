import React, { Component } from 'react';
import '../styles/App.css';
import { Button, MenuItem, NavItem, Grid, Row, Col, Carousel, PageHeader } from 'react-bootstrap'
import pic1 from '../assets/pic.png'
import pic2 from '../assets/nfl_17_aa-900x500.jpg'
import pic3 from '../assets/nflfootball.jpg'

const CarouselInstance = () => {
  return (
    <Carousel bsClass="carousel">
      <Carousel.Item>
        <img width={900} height={500} alt="900x500" src={ pic1 } />
        <Carousel.Caption>
          <h3>NFLDB</h3>
          <p>All the data about your favorite coach.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={900} height={500} alt="900x500" src={ pic2 } />
        <Carousel.Caption>
          <h3>NFLDB</h3>
          <p>Find data for your favorite player.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={900} height={500} alt="900x500" src={ pic3 } />
        <Carousel.Caption>
          <h3>NFLDB</h3>
          <p>Get information on all your favorite teams. </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
)};

export const Splash = props => {
  return (
    <div>
      <PageHeader>Welcome! <small>This is an NFL Database that contains info about players, teams, coaches, and seasons! Use the navigation bar to look through all of the different information.</small></PageHeader>
      <CarouselInstance/>
      
    </div>
)};