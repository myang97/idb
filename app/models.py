from flask import Flask
from flask_sqlalchemy import SQLAlchemy

builtin_list = list


db = SQLAlchemy()


def init_app(app):
    # Disable track modifications, as it unnecessarily uses memory.
    app.config.setdefault('SQLALCHEMY_TRACK_MODIFICATIONS', False)
    db.init_app(app)


def from_sql(row):
    """Translates a SQLAlchemy model instance into a dictionary"""
    data = row.__dict__.copy()
    data['id'] = row.id
    data.pop('_sa_instance_state')
    return data

# BEGIN Definitions of Models
class Player(db.Model):
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

class Coach(db.Model):

    __tablename__ = 'coaches'

    id = db.Column(db.String(50) ,primary_key=True)
    last_name = db.Column(db.String(50))
    first_name = db.Column(db.String(50))
    position = db.Column(db.String(50))
    team = db.Column(db.String(50))
    pic_link = db.Column(db.String(50))

    def __repr__(self):
        return "<Coach(first_name='%s', last_name=%s)" % (self.first_name, self.last_name)

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
    pic_link = db.Column(db.String(50))
    points_rank = db.Column(db.Integer)
    conference_rank = db.Column(db.Integer)
    division_rank = db.Column(db.Integer)
    season_wins = db.Column(db.Integer)
    season_losses = db.Column(db.Integer)

    def __repr__(self):
        return "<Team(team_name='%s')" % (self.team_name)


class Season(db.Model):

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
        return "<Season(year='%s')" % (self.first_name, self.last_name)

#  END Definition of Models

# Begin GET Methods

def playerList(limit=10, cursor=None):
    cursor = int(cursor) if cursor else 0
    query = (Player.query
             .order_by(Player.id)
             .limit(limit)
             .offset(cursor))
    books = builtin_list(map(from_sql, query.all()))
    next_page = cursor + limit if len(books) == limit else None
    return (books, next_page)


def getPlayer(id):
    result = Player.query.get(id)
    if not result:
        return None
    return from_sql(result)

def coachList(limit=10, cursor=None):
    cursor = int(cursor) if cursor else 0
    query = (Coach.query
             .order_by(Coach.id)
             .limit(limit)
             .offset(cursor))
    books = builtin_list(map(from_sql, query.all()))
    next_page = cursor + limit if len(books) == limit else None
    return (books, next_page)

def getCoach(id):
    result = Coach.query.get(id)
    if not result:
        return None
    return from_sql(result)

def teamList(limit=10, cursor=None):
    cursor = int(cursor) if cursor else 0
    query = (Team.query
             .order_by(Team.team_name)
             .limit(limit)
             .offset(cursor))
    books = builtin_list(map(from_sql, query.all()))
    next_page = cursor + limit if len(books) == limit else None
    return (books, next_page)

def getTeam(team_alias):
    result = Team.query.get(team_alias)
    if not result:
        return None
    return from_sql(result)

def seasonList(limit=10, cursor=None):
    cursor = int(cursor) if cursor else 0
    query = (Season.query
             .order_by(Season.year)
             .limit(limit)
             .offset(cursor))
    books = builtin_list(map(from_sql, query.all()))
    next_page = cursor + limit if len(books) == limit else None
    return (books, next_page)

def getSeason(id):
    result = Season.query.get(id)
    if not result:
        return None
    return from_sql(result)

# id parameter = coach id
def getPlayersAndIDCoach(id):


    return 0;

# id parameter = season id
def getPlayersAndIDSeason(id):
    return 0;

# id parameter = team id
def getCoachAndIDTeam(id):
    return 0;

# id parameter = team id
def getSeasonsAndIDTeam(id):
    return 0;

# id parameter = player id
def getCoachAndIDPlayers(id):
    return 0;



# END GET methods
def create(data):
    book = Player(**data)
    db.session.add(book)
    db.session.commit()
    return from_sql(book)

# [START update]
def update(data, id):
    book = Player.query.get(id)
    for k, v in data.items():
        setattr(book, k, v)
    db.session.commit()
    return from_sql(book)
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
