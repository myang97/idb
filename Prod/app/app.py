from models import *
from flask_restful import fields, marshal


@app.route('/')
def hello_world():
    return 'Hello, World!'
 

@app.route('/players', methods = ['GET'])
def playerIndex():
    return json.dumps([u.as_dict() for u in Player.query.all()])

#EXAMPLE URL http://127.0.0.1:5000/players/000bc6c6-c9a8-4631-92d6-1cea5aaa1644
@app.route('/players/<string:id>',methods = ['GET'])
def get_player(id):
    return json.dumps(marshal(Player.query.get(id).as_dict(),player_fields))


@app.route('/coaches', methods = ['GET'])
def coachIndex():
    return json.dumps([u.as_dict() for u in Coach.query.all()])

@app.route('/coaches/<string:id>',methods = ['GET'])
def get_coach(id):
    return json.dumps(Coach.query.get(id).as_dict())

@app.route('/teams', methods = ['GET'])
def teamIndex():
    return json.dumps([u.as_dict() for u in Team.query.all()])

@app.route('/teams/<string:team>',methods = ['GET'])
def get_team(team):
    return json.dumps(Team.query.get(team).as_dict())

@app.route('/seasons', methods = ['GET'])
def seasonIndex():
    return json.dumps([u.as_dict() for u in Season.query.all()])

@app.route('/seasons/<string:id>',methods = ['GET'])
def get_season(id):
    return json.dumps(Season.query.get(id).as_dict())

player_fields = {
    'first_name': fields.String(attribute='first_name'),
    'last_name': fields.String(attribute='last_name'),
    'team_alias' : fields.String(attribute='team'),
    'birth_date' : fields.String(attribute = 'birth_date'),
    'uri' : fields.Url('get_player'),
    'team_uri' : fields.Url('get_team')
}


if __name__ == '__main__':
    app.run(debug=True)
