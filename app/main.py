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
from flask_cors import CORS
import models, json
import sqlalchemy
import config


app = Flask(__name__)
CORS(app)
app.config.from_object(config)
with app.app_context():
    models.init_app(app)

@app.route("/")
def hello():
    return "Hello, world!"

@app.route('/players', methods = ['GET'])
def playerIndex():
    if request.args.get('page'):
        pageNum = int(request.args.get('page'))
    else:
        pageNum = 1
    if request.args.get('order'):
        alphabeticalOrder = str(request.args.get('order'))
    else:
        alphabeticalOrder = None
    if request.args.get('filter'):
        teamFilter = str(request.args.get('filter'))
    else:
        teamFilter = None

    players, next_page_token = models.playerList(pageNum, alphabeticalOrder, teamFilter)
    return json.dumps(players)

@app.route('/players/<string:id>', methods = ['GET'])
def getPlayer(id):
    player = models.getPlayer(id)
    return json.dumps(player)

@app.route('/coaches', methods = ['GET'])
def coachIndex():
    if request.args.get('page'):
        pageNum = int(request.args.get('page'))
    else:
        pageNum = 1
    if request.args.get('order'):
        alphabeticalOrder = str(request.args.get('order'))
    else:
        alphabeticalOrder = None
    if request.args.get('filter'):
        teamFilter = str(request.args.get('filter'))
    else:
        teamFilter = None

    coaches, next_page_token = models.coachList(pageNum, alphabeticalOrder, teamFilter)
    return json.dumps(coaches)

@app.route('/coaches/<string:id>', methods = ['GET'])
def getCoach(id):
    coach = models.getCoach(id)
    return json.dumps(coach)

@app.route('/teams', methods = ['GET'])
def teamIndex():
    if request.args.get('page'):
        pageNum = int(request.args.get('page'))
    else:
        pageNum = 1
    if request.args.get('order'):
        alphabeticalOrder = str(request.args.get('order'))
    else:
        alphabeticalOrder = None
    if request.args.get('filter'):
        teamFilter = str(request.args.get('filter'))
    else:
        teamFilter = None

    teams, next_page_token = models.teamList(pageNum, alphabeticalOrder, teamFilter)
    return json.dumps(teams)

@app.route('/teams/<string:team_alias>', methods = ['GET'])
def getTeam(team_alias):
    team = models.getTeam(team_alias)
    return json.dumps(team)

@app.route('/seasons', methods = ['GET'])
def seasonIndex():
    if request.args.get('page'):
        pageNum = int(request.args.get('page'))
    else:
        pageNum = 1
    if request.args.get('order'):
        alphabeticalOrder = str(request.args.get('order'))
    else:
        alphabeticalOrder = None
    if request.args.get('filter'):
        teamFilter = str(request.args.get('filter'))
    else:
        teamFilter = None

    seasons, next_page_token = models.seasonList(pageNum, alphabeticalOrder, teamFilter)
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

@app.route('/search/<string:id>', methods = ['GET'])
def getSearchResult(id):
    if request.args.get('page'):
        pageNum = int(request.args.get('page'))
    else:
        pageNum = 1
    searchDict = models.getSearch(id, pageNum)
    return json.dumps(searchDict)

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
