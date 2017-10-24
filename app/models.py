# from app import db
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://dummy:dummy@35.192.125.156/nfldata'
db = SQLAlchemy(app)

class JsonModel(object):
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Player(db.Model, JsonModel):

    __tablename__ = 'players'

    id = db.Column(db.String(50),primary_key=True)
    last_name = db.Column(db.String(50))
    first_name = db.Column(db.String(50))
    birth_date = db.Column(db.String(50))
    high_school = db.Column(db.String(50))
    weight = db.Column(db.String(50)) #in lbs
    height = db.Column(db.String(50)) #inches
    position = db.Column(db.String(50))
    jersey = db.Column(db.String(50))
    rookie_year = db.Column(db.String(50))
    team = db.Column(db.String(50))
    pic_link = db.Column(db.String(50))



class Coach(db.Model):

    __tablename__ = 'coaches'

    id = db.Column(db.String(50) ,primary_key=True)
    last_name = db.Column(db.String(50))
    first_name = db.Column(db.String(50))
    position = db.Column(db.String(50))
    team = db.Column(db.String(50))
    pic_link = db.Column(db.String(50))

class Team(db.Model):
    
    __tablename__ = 'teams'

    id = db.Column(db.String(50))
    team_alias = db.Column(db.String(50),primary_key=True)
    team_name = db.Column(db.String(50))
    team_market = db.Column(db.String(50))
    conference = db.Column(db.String(50))
    division = db.Column(db.String(50))
    venue_name = db.Column(db.String(50))
    venue_location = db.Column(db.String(50))
    pick_link = db.Column(db.String(50))

# class TeamStats(db.Model):
#     id = db.Column(db.String(50))
#     team_alias = db.Column(db.String(50))
#     year = db.Column(db.Integer)
#     overall_rank = db.Column(db.Integer)
#     conference_rank = db.Column(db.Integer)
#     division_rank = db.Column(db.Integer)
#     season_wins = db.Column(db.Integer)
#     season_losses = db.Column(db.Integer)

