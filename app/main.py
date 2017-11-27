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

import logging

from flask import Flask, request
from flask_cors import CORS
import models, json
import config
import OrderBy
import FilterBy
from models import Player, Season, Team, Coach



app = Flask(__name__)
CORS(app)
app.config.from_object(config)
with app.app_context():
    models.init_app(app)

# List Endpoints

@app.route('/players', methods = ['GET'])
def playerIndex():
    pageNum = int(request.args.get('page', None))
    order = OrderBy.OrderByPlayer(request.args.get('order', None)).value()
    filters = FilterBy.PlayerFilter(request.args.get('filter', None)).value()
    if pageNum:
        players = Player.list(order, filters, pageNum)
    else:
        players = Player.list(order, filters, all=True)
    return json.dumps(players)

@app.route('/coaches', methods = ['GET'])
def coachIndex():
    pageNum = int(request.args.get('page', None))
    order = OrderBy.OrderByCoach(request.args.get('order', None)).value()
    filters = FilterBy.CoachFilter(request.args.get('filter', None)).value()
    if pageNum:
        coaches = Coach.list(order, filters, pageNum)
    else:
        coaches = Coach.list(order, filters, all=True)
    return json.dumps(coaches)

@app.route('/teams', methods = ['GET'])
def teamIndex():
    pageNum = int(request.args.get('page', None))
    orderStr = request.args.get('order', None)
    filterStr = request.args.get('filter', None)
    order = OrderBy.OrderByTeam(orderStr, filterStr).value()
    if pageNum:
        teams = Team.list(order, tuple(), pageNum)
    else:
        teams = Team.list(order, tuple(), all=True)
    return json.dumps(teams)

@app.route('/seasons', methods = ['GET'])
def seasonIndex():
    pageNum = int(request.args.get('page', None))
    order = OrderBy.OrderBySeason(request.args.get('order', None)).value()
    filters = FilterBy.SeasonFilter(request.args.get('filter', None)).value()
    if pageNum:
        seasons = Season.list(order, filters, pageNum)
    else:
        seasons = Season.list(order, filters, all=True)
    return json.dumps(seasons)

# Get Item Endpoint

@app.route('/get/<string:model>/<string:id>', methods = ['GET'])
def getModel(model: str, id: str):
    def toClass(model: str):
        """Make sure you are importing all the models globally"""
        return {'Player' : Player, 'Coach' : Coach, 'Team' : Team, 'Season' : Season}\
            .get(model.lower().capitalize(), None)

    model = toClass(model)
    if not model:
        return "Could not covert the model string to a model class"
    item = model.lookup(id)
    return json.dumps(item)

# Search Endpoint

@app.route('/search/<string:term>', methods = ['GET'])
def getSearchResult(term):
    pageNum = int(request.args.get('page', 1))
    if pageNum:
        searchDict = models.search(term, pageNum)
    else:
        searchDict = models.search(term, all=True)
    return json.dumps(searchDict)

# Util Endpoints

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
