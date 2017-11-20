from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
from sqlalchemy.ext.declarative import declared_attr
import OrderBy
import FilterBy

db = SQLAlchemy()

def init_app(app):
    # Disable track modifications, as it unnecessarily uses memory.
    app.config.setdefault('SQLALCHEMY_TRACK_MODIFICATIONS', False)
    db.init_app(app)

def simpleFilter(model, filters: tuple, cursor=0, limit=10000):
    return filterBy(model, cursor, limit, filters, tuple())

def filterBy(model, cursor: int, limit: int, filters, orderBys):
    return (model.query
            .filter(*filters)
            .order_by(*orderBys)
            .limit(limit)
            .offset(cursor))


# Mixin definitions
class ModelFunctionality(object):

    # todo clean up this method so you don't pass the model
    @staticmethod
    def lookup(model, id):
        row = model.query.get(id)
        return row.dict()

    def dict(self):
        data = self.__dict__.copy()
        data.pop('_sa_instance_state')
        return data

    # will not hydrate the model
    def list(self, order: OrderBy, filters: FilterBy, pageNumber: int, limit: int = 12) -> list:
        cursor: int = (pageNumber - 1) * limit
        items = self.filterBy(cursor, limit, filters, order).all()
        dicts = map(items.dict, items)
        return list(dicts)

    def filterBy(self, cursor: int, limit: int, filters, orderBys):
        return (self.query
                .filter(*filters)
                .order_by(*orderBys)
                .limit(limit)
                .offset(cursor))


# BEGIN Definitions of Models

class Player(db.Model, ModelFunctionality):
    __tablename__ = 'players'

    id = db.Column(db.String(50),primary_key=True)
    last_name = db.Column(db.String(50))
    first_name = db.Column(db.String(50))
    birth_date = db.Column(db.String(50))
    high_school = db.Column(db.String(50))
    weight = db.Column(db.Integer) #in lbs
    height = db.Column(db.Integer) #inches
    position = db.Column(db.String(50))
    jersey = db.Column(db.Integer)
    rookie_year = db.Column(db.Integer)
    team = db.Column(db.String(50))
    pic_link = db.Column(db.String(50))

    def hydrated_dict(self):
        raw = super().dict()
        raw['coaches'] = [coach.dict() for coach in raw['coaches']]
        return raw


    def __repr__(self):
        return "<Player(first_name='%s', last_name=%s)" % (self.first_name, self.last_name)

class Coach(db.Model, ModelFunctionality):

    __tablename__ = 'coaches'

    id = db.Column(db.String(50) ,primary_key=True)
    last_name = db.Column(db.String(50))
    first_name = db.Column(db.String(50))
    position = db.Column(db.String(50))
    team = db.Column(db.String(50))
    pic_link = db.Column(db.String(50))
    hometown = db.Column(db.String(50))
    no_super_bowl = db.Column(db.Integer)

    def hydrated_dict(self):
        raw = super().dict()
        raw['players'] = [player.dict() for player in raw['players']]
        return raw

    def __repr__(self):
        return "<Coach(first_name='%s', last_name=%s)" % (self.first_name, self.last_name)

class Team(db.Model, ModelFunctionality):

    __tablename__ = 'teams'

    id = db.Column(db.String(50))
    team_alias = db.Column(db.String(50),primary_key=True)
    team_name = db.Column(db.String(50))
    team_market = db.Column(db.String(50))
    conference = db.Column(db.String(50))
    division = db.Column(db.String(50))
    venue_name = db.Column(db.String(50))
    venue_location = db.Column(db.String(50))
    pic_link = db.Column(db.String(50))
    points_rank = db.Column(db.Integer)
    conference_rank = db.Column(db.Integer)
    division_rank = db.Column(db.Integer)
    season_wins = db.Column(db.Integer)
    season_losses = db.Column(db.Integer)

    def hydrated_dict(self):
        raw = super().dict()
        raw['players'] = [player.dict() for player in raw['players']]
        return raw

    def __repr__(self):
        return "<Team(team_name='%s')" % (self.team_name)


class Season(db.Model, ModelFunctionality):

    __tablename__ = 'seasons'

    id = db.Column(db.String(50),primary_key=True)
    year = db.Column(db.Integer)
    afc_champion = db.Column(db.String(50))
    nfc_champion = db.Column(db.String(50))
    start_date = db.Column(db.String(50))
    end_date = db.Column(db.String(50))
    super_bowl_mvp = db.Column(db.String(50))
    super_bowl_champion = db.Column(db.String(50))
    season_mvp = db.Column(db.String(50))
    pic_link = db.Column(db.String(50))

    def __repr__(self):
        return "<Season(year='%s')" % (self.year)

#  END Definition of Models


def hydratePlayersIntoCoach(inputCoach: Coach):
    inputCoach.players = Player.query.filter(Player.team == inputCoach.team).all()
    return inputCoach

def hydratePlayersIntoTeam(inputTeam: Team):
    inputTeam.players = Player.query.filter(Player.team == inputTeam.team).all()
    return inputTeam

def hydrateCoachesIntoPlayer(inputPlayer: Player):
    inputPlayer.coaches = Coach.query.filter(Coach.team == inputPlayer.team).all()
    return inputPlayer

