#!flask/bin/python
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

from models import Player

app = Flask()
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://dummy:dummy@35.192.125.156/nfldata'
db = SQLAlchemy(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'
    
@app.route('/players', methods = ['GET'])
def playerIndex():
    return jsonify({'players': Player.query.all()})

@app.route('/players/<int::id>',methods = ['GET'])
def get_player(id):
    return jsonify({'Player': Player.query.get(id)})

if __name__ == '__main__':
    app.run(debug=True)
