#!flask/bin/python
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import json

from models import Player

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://dummy:dummy@35.192.125.156/nfldata'
db = SQLAlchemy(app)

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

if __name__ == '__main__':
    app.run(debug=True)
