from models import *

@app.route('/')
def hello_world():
    return 'Hello, World!'
    
@app.route('/players', methods = ['GET'])
def playerIndex():
    #return jsonify({'players': Player.query.all()})
    return json.dumps([u.as_dict() for u in Player.query.all()])

@app.route('/players/<string:id>',methods = ['GET'])
def get_player(id):
    return json.dumps(Player.query.get(id).as_dict())

@app.route('/coaches', methods = ['GET'])
def coachIndex():
    return json.dumps([u.as_dict() for u in Coach.query.all()])

@app.route('/coaches/<string:id>',methods = ['GET'])
def get_coach(id):
    return json.dumps(Coach.query.get(id).as_dict())

@app.route('/teams', methods = ['GET'])
def teamIndex():
    return json.dumps([u.as_dict() for u in Team.query.all()])

@app.route('/teams/<string:team_alias>',methods = ['GET'])
def get_team(id):
    return json.dumps(Team.query.get(team_alias).as_dict())



if __name__ == '__main__':
    app.run(debug=True)
