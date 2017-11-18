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
import OrderBy
import FilterBy


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
    pageNum = int(request.args.get('page', 1))
    order = OrderBy.OrderByPlayer(request.args.get('order', None)).value()
    filters = FilterBy.PlayerFilter(request.args.get('filter', None)).value()
    players = models.listPlayers(order, filters, pageNum)
    return json.dumps(players)

@app.route('/coaches', methods = ['GET'])
def coachIndex():
    pageNum = int(request.args.get('page', 1))
    order = OrderBy.OrderByCoach(request.args.get('order', None)).value()
    filters = FilterBy.CoachFilter(request.args.get('filter', None)).value()
    coaches = models.listCoaches(order, filters, pageNum)
    return json.dumps(coaches)

@app.route('/teams', methods = ['GET'])
def teamIndex():
    pageNum = int(request.args.get('page', 1))
    orderStr = request.args.get('order', None)
    filterStr = request.args.get('filter', None)
    order = OrderBy.OrderByTeam(orderStr, filterStr).value()
    teams = models.listTeams(order, tuple(), pageNum)
    return json.dumps(teams)

@app.route('/seasons', methods = ['GET'])
def seasonIndex():
    pageNum = int(request.args.get('page', 1))
    order = OrderBy.OrderBySeason(request.args.get('order', None)).value()
    filters = FilterBy.SeasonFilter(request.args.get('filter', None)).value()
    seasons = models.listSeasons(order, filters, pageNum)
    return json.dumps(seasons)

@app.route('/seasons/<string:id>', methods = ['GET'])
def getSeason(id):
    season = models.getSeason(id)
    return json.dumps(season)

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
