from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
from itertools import combinations
import OrderBy
import FilterBy

db = SQLAlchemy()

def init_app(app):
    # Disable track modifications, as it unnecessarily uses memory.
    app.config.setdefault('SQLALCHEMY_TRACK_MODIFICATIONS', False)
    db.init_app(app)


# Mixin definitions
class ModelFunctionality(object):

    @staticmethod
    def raw_dict(row):
        data = row.__dict__.copy()
        data.pop('_sa_instance_state')
        return data

    @classmethod
    def filterBy(cls, cursor: int, limit: int, filters, orderBys):
        return (cls.query
                .filter(*filters)
                .order_by(*orderBys)
                .limit(limit)
                .offset(cursor))

    @classmethod
    def lookup(cls, id):
        row = cls.query.get(id)
        return row.dict()

    @classmethod
    def list(cls, order: OrderBy, filters: FilterBy, pageNumber: int, limit: int = 12) -> list:
        cursor: int = (pageNumber - 1) * limit
        items = cls.filterBy(cursor, limit, filters, order).all()
        dicts = map(cls.raw_dict, items)
        return list(dicts)

    def dict(self):
        data = self.__dict__.copy()
        data.pop('_sa_instance_state')
        return data


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

    @classmethod
    def lookup(cls, id):
        row = cls.query.get(id)
        row = hydrateCoachesIntoPlayer(row)
        raw = row.dict()
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

    @classmethod
    def lookup(cls, id):
        row = cls.query.get(id)
        row = hydratePlayersIntoCoach(row)
        raw = row.dict()
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

    @classmethod
    def lookup(cls, id):
        row = cls.query.get(id)
        row = hydratePlayersIntoTeam(row)
        raw = row.dict()
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


#  hydration helper methods

def hydratePlayersIntoCoach(inputCoach: Coach):
    inputCoach.players = Player.query.filter(Player.team == inputCoach.team).all()
    return inputCoach

def hydratePlayersIntoTeam(inputTeam: Team):
    inputTeam.players = Player.query.filter(Player.team == inputTeam.team).all()
    return inputTeam

def hydrateCoachesIntoPlayer(inputPlayer: Player):
    inputPlayer.coaches = Coach.query.filter(Coach.team == inputPlayer.team).all()
    return inputPlayer

#   search methods

def search(search_terms: str, pageNumber: int, limit: int = 12):
    def google_search_terms(terms : list):
        return [c for r in range(1, len(terms) + 1) for c in combinations(terms, r)]

    limit = limit // 4
    cursor: int = (pageNumber - 1) * limit
    terms = google_search_terms(search_terms.split('_'))
    resultsDict = {}
    resultsDict['player_results'] = []
    resultsDict['coach_results'] = []
    resultsDict['team_results'] = []
    resultsDict['season_results'] = []
    print(terms)
    for term in terms:
        matchString = "%" + "%".join(term) + "%"
        print(matchString)
        resultsDict['player_results'] += searchTable(
                                                Player,
                                                cursor,
                                                limit,
                                                Player.last_name.like(matchString),
                                                Player.first_name.like(matchString),
                                                Player.birth_date.like(matchString),
                                                Player.high_school.like(matchString),
                                                Player.weight.like(matchString),
                                                Player.height.like(matchString),
                                                Player.position.like(matchString),
                                                Player.jersey.like(matchString),
                                                Player.team.like(matchString),
                                                Player.team.like(matchString))
        resultsDict['coach_results'] += searchTable(
                                                Coach,
                                                cursor,
                                                limit,
                                                Coach.last_name.like(matchString),
                                                Coach.first_name.like(matchString),
                                                Coach.position.like(matchString),
                                                Coach.team.like(matchString),
                                                Coach.hometown.like(matchString),
                                                Coach.no_super_bowl.like(matchString))
        resultsDict['team_results'] += searchTable(
                                                Team,
                                                cursor,
                                                limit,
                                                Team.team_alias.like(matchString),
                                                Team.team_name.like(matchString),
                                                Team.team_market.like(matchString),
                                                Team.conference.like(matchString),
                                                Team.division.like(matchString),
                                                Team.venue_name.like(matchString),
                                                Team.venue_location.like(matchString),
                                                Team.points_rank.like(matchString),
                                                Team.conference_rank.like(matchString),
                                                Team.division_rank.like(matchString),
                                                Team.season_wins.like(matchString),
                                                Team.season_losses.like(matchString))
        resultsDict['season_results'] += searchTable(
                                                Season,
                                                cursor,
                                                limit,
                                                Season.year.like(matchString),
                                                Season.afc_champion.like(matchString),
                                                Season.nfc_champion.like(matchString),
                                                Season.start_date.like(matchString),
                                                Season.end_date.like(matchString),
                                                Season.super_bowl_mvp.like(matchString),
                                                Season.super_bowl_champion.like(matchString),
                                                Season.season_mvp.like(matchString))

    resultsDict['player_results'] = hydrateIds(set(resultsDict['player_results']), Player, getSimpleModel)
    resultsDict['coach_results'] = hydrateIds(set(resultsDict['coach_results']), Coach, getSimpleModel)
    resultsDict['team_results'] = hydrateIds(set(resultsDict['team_results']), Team, getSimpleTeam)
    resultsDict['season_results'] = hydrateIds(set(resultsDict['season_results']), Season, getSimpleModel)
    return resultsDict


def hydrateIds(ids, model, getFunction):
    return [getFunction(model, i) for i in ids]

def getSimpleModel(model, id):
    result = model.query.get(id)
    if not result:
        return None

    return result.dict()

def getSimpleTeam(model, result_id):
    # result = Team.query.filter(Team.id == result_id)
    rows = Team.query.all()
    for r in rows:
        dictR = r.dict()
        if dictR['id'] == result_id:
            return dictR
    return None

def searchTable(model, cursor, limit, *predicates):
    inst = model.query\
        .filter(or_(*predicates))\
        .limit(limit)\
        .offset(cursor)
    raws = map(model.raw_dict, inst)
    ids = (r['id'] for r in raws)
    return list(ids)
