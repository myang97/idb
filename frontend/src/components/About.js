import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import { Button, Grid, Row, Col } from 'react-bootstrap'

export class About extends React.Component {

  constructor(props) {
    super(props);

    this.baseUrl = 'https://api.github.com/repos/myang97/idb';

    this.gitHubIds = [ "myang97", "TuckerTroy", "Jaabi", "jansenderr", "obermea", "epersico", "jcristol" ];

    this.state = {
      gitHubCommitStats: [],
      numCommitsPairs: {},
      totalCommits: 0,
      gitHubIssuesStats: [],
      numIssuesPairs: {},
      totalIssues: 0,
      unitTestsStats: [],
      totalUnitTests: 8,
      errorString: "",
      testString: ""
    };
  }

  componentDidMount() {
    //Get number of commits
    this.getGitHubCommits();
    this.getGitHubIssues();
  }

  //Get number of commits
  getGitHubCommits() {
    console.log('githubcommits')

    var totesCommits = 0;

    axios.get( this.baseUrl + '/contributors', {
      crossdomain: true,
    })
    .then((response) => {
      console.log(response);
      this.setState((prevState) => {
        let state = prevState;
        
        var commitPairs = {};

        for( var i = 0; i < 7; i++ )
        {
          var login = response.data[i].login;
          var commits = response.data[i].contributions;

          totesCommits += commits;

          commitPairs[ login ] = commits;
        }

        state.numCommitsPairs = commitPairs;
        state.totalCommits = totesCommits;
        // state.testString = JSON.stringify( response.data, null, 1 );

        return state;
      });
    }).catch(function (error) {
        console.log(error);
        this.setState((prevState) => {
          let state = prevState
          state.errorString = error
          return state
        });
    });
    this.setState((prevState) => {
      let state = prevState
      // state.testString = JSON.stringify( this.state.gitHubCommitStats, null, 1 );
      return state
    });
  }

  //Safely get the number of commits
  safeGetCommits( login ) {
    if( this.state.numCommitsPairs.hasOwnProperty( login ) )
    {
      return this.state.numCommitsPairs[ login ];
    }

    return 0;
  }

  //Extract the number of issues from GitHub
  async getGitHubIssues() {

    var tempIssues = { "myang97": 400000 };
    var totesIssues = 0;

    //NOTE: The following is SO much cleaner but doesn't work. :c
    for( var j = 0; j < this.gitHubIds.length; j++ )
    {
      var currUser = this.gitHubIds[j];
    
      await axios.get( this.baseUrl + "/issues?state=all&creator=" + currUser, {
        crossdomain: true,
      })
      .then( function(response) {
        tempIssues[ currUser ] = response.data.length;
        totesIssues += response.data.length;
      })
      .catch( function(error) {
        console.log(error);
      });
    }

    //Get the number of issues here c:
    this.setState((prevState) => {
      let state = prevState;
      state.numCommitsPairs = prevState.numCommitsPairs;

      state.numIssuesPairs = tempIssues;
      state.totalIssues = totesIssues;
      state.testString += "\tLen: " + Object.keys(tempIssues).length ;

      // state.errorString += response.data.length;

      return state;
    });
  }

  //Safely get the number of issues
  safeGetIssues( login ) {
    if( this.state.numIssuesPairs.hasOwnProperty( login ) )
    {
      return this.state.numIssuesPairs[ login ];
    }

    return 0;
  }

  //Get the number of unit tests 

  //Debugging stuff
  /*
    <div className="container-fluid">
      <p>{ this.state.testString }</p>
      <p>Error: { this.state.errorString  }</p>
    </div>
  */
  
  render() {
    return (
      <div>
        <div className="container-fluid">
          <h3>The NFLDB: About</h3>
          <p>This site is for the lookup of all NFL statistics for die-hard and casual fans alike! Welcome all!</p>
          <br/>
          <p>Group Name: NFLovers</p>
        </div> 
        <div className="container-fluid">
            <div className="row text-center">
                <div className="col-lg-4">
                    <div className="grid">
                        <h3><i><b>Michael Yang</b></i></h3>
                        <img className="separator" src={ require("../assets/team/michael.jpg") } alt="" />
                        <div className="clearboth"></div>
                        <div>
                            <p className="alignleft alignright paragraph">
                                Michael Yang is a 3rd year Computer Science major at the University of Texas at Austin.
                                He enjoys jamming out on the piano, playing board games, and trying out new food.
                                Michael aspires to be a Software Developer after graduation.
                            </p>
                        </div>
                        <div className="clearboth"></div>
                        <div>
                            <p className="alignleft"><b>Responsibilities:</b></p>
                            <p className="alignright"><b>Front-end Dev</b></p>
                        </div>
                        <div className="clearboth"></div>
                        <div>
                            <p className="alignleft"><b>Number of Commits:</b></p>
                            <p className="alignright"><b>{ this.safeGetCommits("myang97") }</b></p>
                        </div>
                        <div className="clearboth"></div>
                        <div>
                            <p className="alignleft"><b>Number of Issues:</b></p>
                            <p className="alignright"><b>{ this.safeGetIssues("myang97") }</b></p>
                        </div>
                        <div className="clearboth"></div>
                        <div>
                            <p className="alignleft"><b>Number of Unit Tests:</b></p>
                            <p className="alignright"><b>8</b></p>
                        </div>
                        <div className="clearboth"></div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="grid">
                        <h3><i><b>Tucker Melton</b></i></h3>
                        <img className="separator" src={ require("../assets/team/tucker.jpg") } alt="" />
                        <div className="clearboth"></div>
                        <div>
                            <p className="alignleft alignright paragraph">
                                Tucker Melton is a senior computer science major at the University of Texas at Austin.
                                He enjoys to hang out with friends and travel whenever possible.
                                Tucker aspires to be a software engineer somewhere after completing his Bachelor degree.
                            </p>
                        </div>
                        <div className="clearboth"></div>
                        <div>
                            <p className="alignleft"><b>Responsibilities:</b></p>
                            <p className="alignright"><b>Coach Page Dev</b></p>
                        </div>
                        <div className="clearboth"></div>
                        <div>
                            <p className="alignleft"><b>Number of Commits:</b></p>
                            <p className="alignright"><b>{ this.safeGetCommits("TuckerTroy") }</b></p>
                        </div>
                        <div className="clearboth"></div>
                        <div>
                            <p className="alignleft"><b>Number of Issues:</b></p>
                            <p className="alignright"><b>{ this.safeGetIssues("TuckerTroy") }</b></p>
                        </div>
                        <div className="clearboth"></div>
                        <div>
                            <p className="alignleft"><b>Number of Unit Tests:</b></p>
                            <p className="alignright"><b>0</b></p>
                        </div>
                        <div className="clearboth"></div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="grid">
                        <h3><i><b>Abdiel Rodriguez</b></i></h3>
                        <img className="separator" src={ require("../assets/team/abdiel.png") } alt="" />
                        <div className="clearboth"></div>
                        <div>
                            <p className="alignleft alignright paragraph">
                                A student of the University of Texas at Austin in Austin, Texas. As of 2017, studying
                                computer science and is one year from graduation.
                                Has aspirations to be a great musician and video game programmer and designer.
                            </p>
                        </div>
                        <div className="clearboth"></div>
                        <div>
                            <p className="alignleft"><b>Responsibilities:</b></p>
                            <p className="alignright"><b>Technical Report</b></p>
                        </div>
                        <div className="clearboth"></div>
                        <div>
                            <p className="alignleft"><b>Number of Commits:</b></p>
                            <p className="alignright"><b>{ this.safeGetCommits("Jaabi") }</b></p>
                        </div>
                        <div className="clearboth"></div>
                        <div>
                            <p className="alignleft"><b>Number of Issues:</b></p>
                            <p className="alignright"><b>{ this.safeGetIssues("Jaabi") }</b></p>
                        </div>
                        <div className="clearboth"></div>
                        <div>
                            <p className="alignleft"><b>Number of Unit Tests:</b></p>
                            <p className="alignright"><b>0</b></p>
                        </div>
                        <div className="clearboth"></div>
                    </div>
                </div>
            </div>

            <div className="row text-center">
              <div className="col-lg-4">
                <div className="grid">
                  <h3><i><b>Jansen Derr</b></i></h3>
                  <img className="separator" src={ require("../assets/team/jansen.jpg") } alt="" />
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft alignright paragraph">
                      Jansen Derr is a 4th year student planning to graduate
                      in the Spring of 2018. He enjoys the outdoors, sailing, tennis, climbing, gardening, music, and art. His recent interests in the computer science field is towards machine learning. 
                    </p>
                  </div>
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft"><b>Responsibilities:</b></p>
                    <p className="alignright"><b>Apiary API</b></p>
                  </div>
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft"><b>Number of Commits:</b></p>
                    <p className="alignright"><b>{ this.safeGetCommits("jansenderr") }</b></p>
                  </div>
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft"><b>Number of Issues:</b></p>
                    <p className="alignright"><b>{ this.safeGetIssues("jansenderr") }</b></p>
                  </div>
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft"><b>Number of Unit Tests:</b></p>
                    <p className="alignright"><b>0</b></p>
                  </div>
                  <div className="clearboth"></div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="grid">
                  <h3><i><b>Octaviano Bermea</b></i></h3>
                  <img className="separator" src={ require("../assets/team/octaviano.jpg") } alt="" />
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft alignright paragraph">
                      Octaviano Bermea is a senior Computer Science major at the University of Texas at Austin.
                      He likes to visit the local arcades and ride his bike around campus and on trails. He wants to be a software engineer and a mobile app developer upon graduation.
                    </p>
                  </div>
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft"><b>Responsibilities:</b></p>
                    <p className="alignright"><b>API Data Retrieval</b></p>
                  </div>
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft"><b>Number of Commits:</b></p>
                    <p className="alignright"><b>{ this.safeGetCommits("obermea") }</b></p>
                  </div>
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft"><b>Number of Issues:</b></p>
                    <p className="alignright"><b>{ this.safeGetIssues("obermea") }</b></p>
                  </div>
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft"><b>Number of Unit Tests:</b></p>
                    <p className="alignright"><b>0</b></p>
                  </div>
                  <div className="clearboth"></div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="grid">
                  <h3><i><b>Elliot Persico</b></i></h3>
                  <img className="separator" src={ require("../assets/team/elliot.jpg") } alt="" />
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft alignright paragraph">
                      Elliot Persico is finishing his Master of Arts in Physics this December. He does research on Hamiltonian Chaos. Though not in the className he is auditing to gain valuable experience to prepare for trying to get a software engineering job.
                    </p>
                  </div>
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft"><b>Responsibilities:</b></p>
                    <p className="alignright"><b>Season Page Dev</b></p>
                  </div>
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft"><b>Number of Commits:</b></p>
                    <p className="alignright"><b>{ this.safeGetCommits("epersico") }</b></p>
                  </div>
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft"><b>Number of Issues:</b></p>
                    <p className="alignright"><b>{ this.safeGetIssues("epersico") }</b></p>
                  </div>
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft"><b>Number of Unit Tests:</b></p>
                    <p className="alignright"><b>0</b></p>
                  </div>
                  <div className="clearboth"></div>
                </div>
              </div>
            </div>

              <div className="col-lg-4">
                <div className="grid">
                  <h3><i><b>Joshua Cristol</b></i></h3>
                  <img className="separator" src={ require("../assets/team/joshua.jpg") } alt="" />
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft alignright paragraph">
                      Joshua Cristol is a soon to college grad who enjoys playing chess and learning languages. As a side hobby he is trying to become one of the great programmers of his generation.
                    </p>
                  </div>
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft"><b>Responsibilities:</b></p>
                    <p className="alignright"><b>GCP Hosting</b></p>
                  </div>
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft"><b>Number of Commits:</b></p>
                    <p className="alignright"><b>{ this.safeGetCommits("jcristol") }</b></p>
                  </div>
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft"><b>Number of Issues:</b></p>
                    <p className="alignright"><b>{ this.safeGetIssues("jcristol") }</b></p>
                  </div>
                  <div className="clearboth"></div>
                  <div>
                    <p className="alignleft"><b>Number of Unit Tests:</b></p>
                    <p className="alignright"><b>0</b></p>
                  </div>
                  <div className="clearboth"></div>
                </div>
              </div>

              <div className="col-lg-4 text-left">
                <br/>
                <p styles="font-size:44px;"><b>Totals Statistics</b></p>

                <p styles="font-size:22px;"><b>Total Commits: { this.state.totalCommits }</b></p>

                <p styles="font-size:22px;"><b>Total Issues: { this.state.totalIssues }</b></p>

                <p styles="font-size:22px;"><b>Total Unit Tests: { this.state.totalUnitTests }</b></p>
                  <br/>
                  <p styles="font-size:22px;"><b>Apiary API</b></p>
                  <p styles="font-size:18px;"><a className="blue" href="http://docs.myang97.apiary.io/">
                      <b>http://docs.myang97.apiary.io/</b></a></p>
                  <br/>
                  <p styles="font-size:22px;"><b>Github Repo</b></p>
                  <p styles="font-size:18px;"><a className="blue" href="http://github.com/myang97/idb">
                      <b>http://github.com/myang97/idb</b></a></p>
                  <br/>
                  <p styles="font-size:22px;"><b>Trello Board</b></p>
                  <p styles="font-size:18px;"><a className="blue" href="https://trello.com/b/rrk5M7Zh/phase-3">
                      <b>https://trello.com/b/rrk5M7Zh/phase-3</b></a></p>
                  <br/>
                      <p styles="font-size:22px;"><b>UML</b></p>
                      <p styles="font-size:18px;"><a className="blue" href="https://utexas.app.box.com/s/w470i7gmt81xqn5u0uip13ti1x9bbfkw">
                          <b>https://utexas.app.box.com/s/w470i7gmt81xqn5u0uip13ti1x9bbfkw</b></a></p>
                      <br/>
                  <p styles="font-size:22px;"><b>Report</b></p>
                  <p styles="font-size:18px;"><a className="blue" href="https://utexas.app.box.com/s/sfxixkthifjtdof5rl7t8xblop7cjh5g">
                      <b>https://utexas.app.box.com/s/sfxixkthifjtdof5rl7t8xblop7cjh5g</b></a></p>
                  <br/>
                  <p styles="font-size:22px;"><b>APIs</b></p>
                  <p styles="font-size:18px;">
                      <a className="blue" href="http://developer.sportradar.com/files/indexFootball.html"><b>SportRadar </b></a>
                      <a className="blue" href="https://www.mysportsfeeds.com/data-feeds/api-docs/"><b> MySportsFeeds</b></a>
                  </p>
                  <br/>
                  <p styles="font-size:22px;"><b>Tools</b></p>
                  <p styles="font-size:18px;">
                      <b>
                          Github for collaboration; Apiary for API; Google App Engine for hosting; Namecheap for
                          domain name; Flask for backend; Slack for communication; Trello for tracking progress;
                          PlanItPoker for estimation
                      </b>
                  </p>
                  </div>
                  <div className="col-lg-2"></div>
        </div>
      </div>
    )
  }
};