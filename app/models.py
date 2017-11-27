from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
from itertools import combinations
import OrderBy
import FilterBy
from itertools import zip_longest



db = SQLAlchemy()

def init_app(app):
    # Disable track modifications, as it unnecessarily uses memory.
    app.config.setdefault('SQLALCHEMY_TRACK_MODIFICATIONS', False)
    db.init_app(app)


# Functionality all models share
class ModelFunctionality(object):

    @classmethod
    def searchTable(cls, predicates: tuple, cursor: int = 0, limit = tuple()) -> list:
        """
        table filter using a sql like clause
        :param predicates: a tuple of predicates to filter by
        :param cursor: cursor in the table
        :param limit: limit on the number items returned from the search
        :return: list ids that where found
        """
        rows = cls.query \
            .filter(or_(*predicates)) \
            .limit(limit) \
            .offset(cursor)
        ids = map(ModelFunctionality.getId, rows)
        return list(ids)

    @classmethod
    def search_lookup(cls, id: str) -> dict:
        """
        special lookup used by search that doesn't hydrate models into models
        :param id: string id to lookup
        :return: a dictionary of the id that was searched
        """
        row: db.Model = cls.query.get(id)
        d = row.as_dict()
        d["tablename"] = row.__tablename__
        return d

    @classmethod
    def lookup(cls, id: str) -> dict:
        """
        general lookup of an id from a table
        :param id: string of the id to lookup
        :return: the dictionary result of that id
        """
        row: db.Model = cls.query.get(id)
        key, val = row.fetchExtraData()
        if not key:
            return row.as_dict()
        else:
            result = row.as_dict()
            result[key] = val
            return result

    @classmethod
    def filterBy(cls, filters, orderBys, cursor: int =0, limit = tuple()):
        """
        table filter that uses order by and filter predicates to filter the table
        :param cursor: int cursor in the table
        :param limit: int limit of the number of items returned
        :param filters: tuple of predicates that you want to filter by
        :param orderBys: tuple of strings that determine the orderBy i.e. ascending, descending
        :return: a query object
        """
        return (cls.query
                .filter(*filters)
                .order_by(*orderBys)
                .limit(limit)
                .offset(cursor))

    @classmethod
    def list(cls, order: OrderBy, filters: FilterBy, pageNumber: int, limit: int = 12, all: bool = False) -> list:
        """
        general list function that parsers request and calls filter
        :param order: OrderBy CaseClass
        :param filters: FilterBy CaseClass
        :param pageNumber: the pageNumber to extract
        :param limit: the number of items to limit
        :return: a list of dicts of all the items that need to be listed
        """
        if all:
            items = cls.filterBy(filters, order)
            dicts = map(cls.as_dict, items)
            return list(dicts)
        cursor: int = (pageNumber - 1) * limit
        items = cls.filterBy(filters, order, cursor, limit)
        dicts = map(cls.as_dict, items)
        return list(dicts)

    def fetchExtraData(self):
        """default no hydration"""
        return (None, None)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def getId(self):
        return self.id

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

    def fetchExtraData(self):
        return ('coaches' , [coach.as_dict() for coach in Coach.query.filter(Coach.team == self.team).all()])

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

    def fetchExtraData(self):
        return ('players' , [player.as_dict() for player in Player.query.filter(Player.team == self.team).all()])

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
    def search_lookup(cls, id: str) -> dict:
        rows = Team.query.all()
        for r in rows:
            dictR = r.as_dict()
            if dictR['id'] == id:
                dictR["tablename"] = r.__tablename__
                return dictR
        return None

    def fetchExtraData(self):
        return ('players', [player.as_dict() for player in Player.query.filter(Player.team == self.team_alias).all()])

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

#  END Definition of Models

# Behemoth Search Function

def search(search_terms: str, pageNumber: int, limit: int=12, all: bool = False):

    def predicates(matchString):
        p = {}
        p[Player] = (Player.last_name.like(matchString),
            Player.first_name.like(matchString),
            Player.birth_date.like(matchString),
            Player.high_school.like(matchString),
            Player.weight.like(matchString),
            Player.height.like(matchString),
            Player.position.like(matchString),
            Player.jersey.like(matchString),
            Player.team.like(matchString),
            Player.team.like(matchString))

        p[Coach] = (Coach.last_name.like(matchString),
            Coach.first_name.like(matchString),
            Coach.position.like(matchString),
            Coach.team.like(matchString),
            Coach.hometown.like(matchString),
            Coach.no_super_bowl.like(matchString))

        p[Team] = (Team.team_alias.like(matchString),
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

        p[Season] = (Season.year.like(matchString),
            Season.afc_champion.like(matchString),
            Season.nfc_champion.like(matchString),
            Season.start_date.like(matchString),
            Season.end_date.like(matchString),
            Season.super_bowl_mvp.like(matchString),
            Season.super_bowl_champion.like(matchString),
            Season.season_mvp.like(matchString))
        return p

    def googleSearch(terms : str):
        terms = terms.split('_')
        return [c for r in range(1, len(terms) + 1) for c in combinations(terms, r)]

    limit = limit // 4
    cursor = (pageNumber - 1) * limit
    searchResultIds = {Player : set(), Coach : set(), Team : set(), Season : set()}
    for model in (Player, Coach, Team, Season):
        bigPredicate = []
        for searchTerm in googleSearch(search_terms):
            bigPredicate.append(predicates("%" + "%".join(searchTerm) + "%")[model])
        bigPredicate = (p for tup in bigPredicate for p in tup)
        bigPredicate = tuple(bigPredicate)
        if all:
            searchResultIds |= set(model.searchTable(bigPredicate))
        else:
            searchResultIds[model] |= set(model.searchTable(bigPredicate, cursor, limit))

    players = map(Player.search_lookup, searchResultIds[Player])
    coaches = map(Coach.search_lookup, searchResultIds[Coach])
    teams = map(Team.search_lookup, searchResultIds[Team])
    seasons = map(Season.search_lookup, searchResultIds[Season])
    composition = zip_longest(players, coaches, teams, seasons)
    composition = (e for tupl in composition for e in tupl)
    return [e for e in composition if e]