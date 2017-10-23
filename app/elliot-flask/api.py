#!flask/bin/python

from flask import Flask, abort, make_response
from flask_restful import Api, Resource, reqparse, fields, marshal

app = Flask(__name__,static_url_path="")
api = Api(app)

rootURL = '/nfldb.fun/data' # We will need to decide where we are hosting this.

# example call will be curl -i http://localhost:5000/nfldb.fun/data/players
players = [
    {
        "player_id": 1,
        "name": u"Tom Brady",
        "age": 40,
        "coach_id": 1
    },
    {
        "player_id": 2,
        "name": u"Russsell Wilson",
        "age": 28,
        "coach_id": 2
    }
]

player_fields = {
    'name': fields.String,
    'age' : fields.Integer,
    'uri' : fields.Url('player'),
    'coach_uri' : fields.Url('coach')
}


class PlayerListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name',type=str,required=True,
            help='No name provided',location='json')
        super(PlayerListAPI, self).__init__()

    def get(self):
        return {'Players': [marshal(player, player_fields) for player in players]}

class PlayerAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name',type=str,location='json')
        # self.reqparse.add_argument('age',type=int,location='json')
        super(PlayerAPI,self).__init__()

    def get(self,player_id):
        player = [player for player in players if player['player_id'] == player_id]
        if len(player) == 0:
            abort(404)
        return {'player': marshal(player[0], player_fields)}

api.add_resource(PlayerListAPI, rootURL+'/players',endpoint='players')
api.add_resource(PlayerAPI,rootURL+'/players/<int:player_id>',endpoint='player')

coaches = [
    {
        "coach_id": 1,
        "name": "Bill Belichick",
        "age": 65
    },
    {
        "coach_id": 2,
        "name": "Pete Carroll",
        "age": 66
    }
]

coach_fields = {
    'name' : fields.String,
    'age' : fields.Integer,
    'uri' : fields.Url('coach')
}

class CoachListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name',type=str,required=True,
            help='No name provided',location='json')
        super(CoachListAPI, self).__init__()

    def get(self):
        return {'Coaches': [marshal(coach, coach_fields) for coach in coaches]}

class CoachAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name',type=str,location='json')
        # self.reqparse.add_argument('age',type=int,location='json')
        super(CoachAPI,self).__init__()

    def get(self,coach_id):
        coach = [coach for coach in coaches if coach['coach_id'] == coach_id]
        if len(coach) == 0:
            abort(404)
        return {'coach': marshal(coach[0], coach_fields)}

api.add_resource(CoachListAPI, rootURL+'/coaches',endpoint='coaches')
api.add_resource(CoachAPI,rootURL+'/coaches/<int:coach_id>',endpoint='coach')

if __name__ == '__main__':
    app.run(debug=True)
