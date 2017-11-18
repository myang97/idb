from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
from sqlalchemy.ext.declarative import declared_attr

builtin_list = list


db = SQLAlchemy()

def init_app(app):
    # Disable track modifications, as it unnecessarily uses memory.
    app.config.setdefault('SQLALCHEMY_TRACK_MODIFICATIONS', False)
    db.init_app(app)

# Mixin definitions
class ModelFunctionality(object):
    def dict(self):
        data = self.__dict__.copy()
        data.pop('_sa_instance_state')
        return data

    def id(self):
        data = self.__dict__.copy()
        return data["id"]


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

# Begin GET Methods

# listPlayers
# listCoaches
# listTeams
# listSeasons

def filterModel(model, limit, cursor, teamFilter, *orderBy):
    if teamFilter is None:
        return (model.query
                .order_by(*orderBy)
                .limit(limit)
                .offset(cursor))
    else:
        return (model.query
                .filter(teamFilter)
                .order_by(*orderBy)
                .limit(limit)
                .offset(cursor))


# Players will be sorted alphabetically and filtered by team
def playerList(pageNum, alphabeticalOrder, teamFilter, limit=12, cursor=None):

    cursor = (pageNum - 1) * limit
    if teamFilter:
        tf = Player.team == teamFilter
    else:
        tf = None
    if alphabeticalOrder == "ascending":
        query = filterModel(Player, limit, cursor, tf, Player.first_name)
    elif alphabeticalOrder == "descending":
        query = filterModel(Player, limit, cursor, tf, Player.first_name.desc())
    else:
        query = filterModel(Player, limit, cursor, tf)
    books = builtin_list(map(from_sql, query.all()))
    next_page = cursor + limit if len(books) == limit else None
    return (books, next_page)


# Coaches will be sorted alphabetically and filtered by team
def coachList(pageNum, alphabeticalOrder, teamFilter, limit=12, cursor=None):

    cursor = (pageNum - 1) * limit
    if teamFilter:
        tf = Coach.team == teamFilter
    else:
        tf = None
    if alphabeticalOrder == "ascending":
        query = filterModel(Coach, limit, cursor, tf, Coach.first_name)
    elif alphabeticalOrder == "descending":
        query = filterModel(Coach, limit, cursor, tf, Coach.first_name.desc())
    else:
        query = filterModel(Coach, limit, cursor, tf)

    books = builtin_list(map(from_sql, query.all()))
    next_page = cursor + limit if len(books) == limit else None
    return (books, next_page)

# Teams will be sorted alphabetically and filtered by either winning, losing or tied
def teamList(pageNum, alphabeticalOrder, teamFilter, limit=12, cursor=None):
    #come back to this one
    if teamFilter:
        limit = 16
        pageNum = 1

    cursor = (pageNum - 1) * limit

    if alphabeticalOrder == "ascending":
        if teamFilter == "top16":
            query = filterModel(Team, limit, cursor, None, Team.conference_rank, Team.team_name)
        elif teamFilter == "bottom16":
            query = filterModel(Team, limit, cursor, None, Team.conference_rank.desc(), Team.team_name)
        else:
            query = filterModel(Team, limit, cursor, None, Team.team_name)
    elif alphabeticalOrder == "descending":
        if teamFilter == "top16":
            query = filterModel(Team, limit, cursor, None, Team.conference_rank, Team.team_name.desc())
        elif teamFilter == "bottom16":
            query = filterModel(Team, limit, cursor, None, Team.conference_rank.desc(), Team.team_name.desc())
        else:
            query = filterModel(Team, limit, cursor, None, Team.team_name.desc())

    else:
        if teamFilter == "top16":
            query = filterModel(Team, limit, cursor, None, Team.conference_rank)
        elif teamFilter == "bottom16":
            query = filterModel(Team, limit, cursor, None, Team.conference_rank.desc())
        else:
            query = filterModel(Team, limit, cursor, None)

    books = builtin_list(map(from_sql, query.all()))
    next_page = cursor + limit if len(books) == limit else None
    return (books, next_page)


# Seasons will be sorted numerically and filtered by which conference won the super bowl
def seasonList(pageNum, alphabeticalOrder, teamFilter, limit=12, cursor=None):

    cursor = (pageNum - 1) * limit

    tf = None
    if teamFilter:
        if teamFilter == "afc":
            tf = Season.afc_champion == Season.super_bowl_champion
        if teamFilter == "nfc":
            tf = Season.nfc_champion == Season.super_bowl_champion

    if alphabeticalOrder == "ascending":
        query = filterModel(Season, limit, cursor, tf, Season.year)
    elif alphabeticalOrder == "descending":
        query = filterModel(Season, limit, cursor, tf, Season.year.desc())
    else:
        query = filterModel(Season, limit, cursor, tf)

    books = builtin_list(map(from_sql, query.all()))
    next_page = cursor + limit if len(books) == limit else None
    return (books, next_page)

def getPlayer(id):
    result = Player.query.get(id)

    if not result:
        return None

    dictResult = from_sql(result)
    query = Coach.query.filter(Coach.team == dictResult["team"])
    coaches = getCoaches(query)

    dictResult["coaches"] = coaches

    return dictResult

def getCoach(id):
    result = Coach.query.get(id)

    if not result:
        return None

    dictResult = from_sql(result)
    query = Player.query.filter(Player.team == dictResult["team"])
    players = getPlayers(query)
    dictResult["players"] = players

    return dictResult

def getTeam(team_alias):
    result = Team.query.get(team_alias)

    if not result:
        return None

    dictResult = from_sql(result)
    query = Player.query.filter(Player.team == dictResult["team_alias"])
    players = getPlayers(query)
    query = Coach.query.filter(Coach.team == dictResult["team_alias"])
    coaches = getCoaches(query)
    dictResult["players"] = players
    dictResult["coaches"] = coaches

    return dictResult

def getSeason(id):
    result = Season.query.get(id)

    if not result:
        return None

    dictResult = from_sql(result)

    seasonQuery = getPlayer(dictResult["season_mvp"])
    superBowlQuery = getPlayer(dictResult["super_bowl_mvp"])

    dictResult["super_bowl_player_name"] = str(seasonQuery["first_name"]) + " " + str(seasonQuery["last_name"])
    dictResult["season_player_name"] = str(superBowlQuery["first_name"]) + " " + str(superBowlQuery["last_name"])

    return dictResult

def getPlayers(query):
    players = []

    for player in query:
        dictPlayer = player.dict()
        playerInstance = {}
        playerInstance["id"] = dictPlayer["id"]
        playerInstance["last_name"] = dictPlayer["last_name"]
        playerInstance["first_name"] = dictPlayer["first_name"]
        playerInstance["birth_date"] = dictPlayer["birth_date"]
        playerInstance["high_school"] = dictPlayer["high_school"]
        playerInstance["weight"] = dictPlayer["weight"]
        playerInstance["height"] = dictPlayer["height"]
        playerInstance["position"] = dictPlayer["position"]
        playerInstance["jersey"] = dictPlayer["jersey"]
        playerInstance["rookie_year"] = dictPlayer["rookie_year"]
        playerInstance["team"] = dictPlayer["team"]
        playerInstance["pic_link"] = dictPlayer["pic_link"]
        players.append(playerInstance)

    return players

def getCoaches(query):
    coaches = []

    for coach in query:
        dictCoach = coach.dict()
        coachInstance = {}
        coachInstance["id"] = dictCoach["id"]
        coachInstance["last_name"] = dictCoach["last_name"]
        coachInstance["first_name"] = dictCoach["first_name"]
        coachInstance["position"] = dictCoach["position"]
        coachInstance["team"] = dictCoach["team"]
        coachInstance["pic_link"] = dictCoach["pic_link"]
        coachInstance["hometown"] = dictCoach["hometown"]
        coachInstance["no_super_bowl"] = dictCoach["no_super_bowl"]
        coaches.append(coachInstance)

    return coaches

def getTeams(query):
    teams = []

    for team in query:
        dictTeam = team.dict()
        teamInstance = {}
        teamInstance["id"] = dictTeam["id"]
        teamInstance["team_alias"] = dictTeam["team_alias"]
        teamInstance["team_name"] = dictTeam["team_name"]
        teamInstance["first_name"] = dictTeam["first_name"]
        teamInstance["team_market"] = dictTeam["team_market"]
        teamInstance["conference"] = dictTeam["conference"]
        teamInstance["division"] = dictTeam["division"]
        teamInstance["venue_name"] = dictTeam["venue_name"]
        teamInstance["venue_location"] = dictTeam["venue_location"]
        teamInstance["pic_link"] = dictTeam["pic_link"]
        teamInstance["points_rank"] = dictTeam["points_rank"]
        teamInstance["conference_rank"] = dictTeam["conference_rank"]
        teamInstance["division_rank"] = dictTeam["division_rank"]
        teamInstance["season_wins"] = dictTeam["season_wins"]
        teamInstance["season_losses"] = dictTeam["season_losses"]
        teams.append(teamInstance)

    return teams

def getSeasons(query):
    seasons = []

    for season in query:
        dictSeason = season.dict()
        seasonInstance = {}
        seasonInstance["id"] = dictSeason["id"]
        seasonInstance["year"] = dictSeason["year"]
        seasonInstance["afc_champion"] = dictSeason["afc_champion"]
        seasonInstance["nfc_champion"] = dictSeason["nfc_champion"]
        seasonInstance["start_date"] = dictSeason["start_date"]
        seasonInstance["end_date"] = dictSeason["end_date"]
        seasonInstance["super_bowl_mvp"] = dictSeason["super_bowl_mvp"]
        seasonInstance["super_bowl_champion"] = dictSeason["super_bowl_champion"]
        seasonInstance["season_mvp"] = dictSeason["season_mvp"]
        seasonInstance["pic_link"] = dictSeason["pic_link"]
        seasons.append(seasonInstance)

    return seasons

def getIdsFromInstances(query):
    instances = []
    for inst in query:
        d = inst.dict()
        instances.append(d["id"])
    return instances

def searchTable(model,cursor, limit, *predicates):
    return getIdsFromInstances(model.query
                             .filter(or_(*predicates))
                             .limit(limit)
                             .offset(cursor))

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
        dictR = from_sql(r)
        if dictR['id'] == result_id:
            return dictR
    return None


def getSearch(query, cursor, limit=12):
    # teams will have ()
    # seasons will have (super bowl and seasons mvp)
    limit = limit // 4
    cursor = (cursor - 1) * limit
    queryWords = query.split('_')
    resultsDict = dict()
    resultsDict['player_results'] = []
    resultsDict['coach_results'] = []
    resultsDict['team_results'] = []
    resultsDict['season_results'] = []
    for e in queryWords:
        resultsDict['player_results'] += searchTable(
                                                Player,
                                                cursor,
                                                limit,
                                                Player.last_name.like("%" + e + "%"),
                                                Player.first_name.like("%" + e + "%"),
                                                Player.birth_date.like("%" + e + "%"),
                                                Player.high_school.like("%" + e + "%"),
                                                Player.weight.like("%" + e + "%"),
                                                Player.height.like("%" + e + "%"),
                                                Player.position.like("%" + e + "%"),
                                                Player.jersey.like("%" + e + "%"),
                                                Player.team.like("%" + e + "%"),
                                                Player.team.like("%" + e + "%"))
        resultsDict['coach_results'] += searchTable(
                                                Coach,
                                                cursor,
                                                limit,
                                                Coach.last_name.like("%" + e + "%"),
                                                Coach.first_name.like("%" + e + "%"),
                                                Coach.position.like("%" + e + "%"),
                                                Coach.team.like("%" + e + "%"),
                                                Coach.hometown.like("%" + e + "%"),
                                                Coach.no_super_bowl.like("%" + e + "%"))
        resultsDict['team_results'] += searchTable(
                                                Team,
                                                cursor,
                                                limit,
                                                Team.team_alias.like("%" + e + "%"),
                                                Team.team_name.like("%" + e + "%"),
                                                Team.team_market.like("%" + e + "%"),
                                                Team.conference.like("%" + e + "%"),
                                                Team.division.like("%" + e + "%"),
                                                Team.venue_name.like("%" + e + "%"),
                                                Team.venue_location.like("%" + e + "%"),
                                                Team.points_rank.like("%" + e + "%"),
                                                Team.conference_rank.like("%" + e + "%"),
                                                Team.division_rank.like("%" + e + "%"),
                                                Team.season_wins.like("%" + e + "%"),
                                                Team.season_losses.like("%" + e + "%"))
        resultsDict['season_results'] += searchTable(
                                                Season,
                                                cursor,
                                                limit,
                                                Season.year.like("%" + e + "%"),
                                                Season.afc_champion.like("%" + e + "%"),
                                                Season.nfc_champion.like("%" + e + "%"),
                                                Season.start_date.like("%" + e + "%"),
                                                Season.end_date.like("%" + e + "%"),
                                                Season.super_bowl_mvp.like("%" + e + "%"),
                                                Season.super_bowl_champion.like("%" + e + "%"),
                                                Season.season_mvp.like("%" + e + "%"))

    resultsDict['player_results'] = hydrateIds(set(resultsDict['player_results']), Player, getSimpleModel)
    resultsDict['coach_results'] = hydrateIds(set(resultsDict['coach_results']), Coach, getSimpleModel)
    resultsDict['team_results'] = hydrateIds(set(resultsDict['team_results']), Team, getSimpleTeam)
    resultsDict['season_results'] = hydrateIds(set(resultsDict['season_results']), Season, getSimpleModel)
    return resultsDict

# END GET methods
def create(data):
    book = Player(**data)
    db.session.add(book)
    db.session.commit()
    return book.dict()

# [START update]
def update(data, id):
    book = Player.query.get(id)
    for k, v in data.items():
        setattr(book, k, v)
    db.session.commit()
    return book.dict()
# [END update]

def delete(id):
    Player.query.filter_by(id=id).delete()
    db.session.commit()


def _create_database():
    """
    If this script is run directly, create all the tables necessary to run the
    application.
    """
    app = Flask(__name__)
    app.config.from_pyfile('../config.py')
    init_app(app)
    with app.app_context():
        db.create_all()
    print("All tables created")


if __name__ == '__main__':
    _create_database()
