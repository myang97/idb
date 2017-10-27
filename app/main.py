# Copyright 2015 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import datetime
import logging
import os
import socket

from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
import models, json
import sqlalchemy
import config


app = Flask(__name__)
app.config.from_object(config)
with app.app_context():
    models.init_app(app)

@app.route("/")
def hello():
    return "Hello, world!"

@app.route('/players', methods = ['GET'])
def playerIndex():
    players, next_page_token = models.playerList()
    return json.dumps(players)

@app.route('/players/<string:id>', methods = ['GET'])
def getPlayer(id):
    player = models.getPlayer(id)
    return json.dumps(player)

@app.route('/coaches', methods = ['GET'])
def coachIndex():
    coaches, next_page_token = models.coachList()
    return json.dumps(coaches)

@app.route('/coaches/<string:id>', methods = ['GET'])
def getCoach(id):
    coach = models.getCoach(id)
    return json.dumps(coach)

@app.route('/teams', methods = ['GET'])
def teamIndex():
    teams, next_page_token = models.teamList()
    return json.dumps(teams)

@app.route('/teams/<string:team_alias>', methods = ['GET'])
def getTeam(team_alias):
    team = models.getTeam(team_alias)
    return json.dumps(team)

@app.route('/seasons', methods = ['GET'])
def seasonIndex():
    seasons, next_page_token = models.seasonList()
    return json.dumps(seasons)

@app.route('/seasons/<string:id>', methods = ['GET'])
def getSeason(id):
    season = models.getSeason(id)
    return json.dumps(season)

@app.route('/playerList/<string:id>', methods = ['GET'])
def getPlayerList(id):
    playerList = models.getPlayersAndIDTeam(id)
    return json.dumps(playerList)

@app.route('/coachList/<string:id>', methods = ['GET'])
def getCoachList(id):
    coachList = models.getCoachAndIDTeam(id)
    return json.dumps(coachList)

@app.route('/seasonsList/<string:id>', methods = ['GET'])
def getSeasonList(id):
    seasonList = models.getSeasonAndIDTeam(id)
    return json.dumps(seasonList)

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500


if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
