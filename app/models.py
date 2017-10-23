
from app import db

class Player(db.model):
    Name = db.Column(db.String(50))

class Coach(db.model):
    id = db.Column(db.String(50) ,primary_key=True)
    lastName = db.Column(db.String(50))
    firstName = db.Column(db.String(50))
    position = db.Column(db.String(50))
    team = db.Column()