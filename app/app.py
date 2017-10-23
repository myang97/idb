#!flask/bin/python

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

@app.route('/players', methods = ['GET'])
def playerIndex():
    return jsonify({'players': Player.query.all()})

@app.route('/players/<int::id>')
def get_player(id):
    return jsonify({'Player': Player.query.get(id)})
