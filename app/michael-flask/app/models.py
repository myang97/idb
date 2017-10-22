from app import db

class JsonModel(object):
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class User(db.Model, JsonModel):
    """
    Create a User table
    """

    __tablename__ = 'User'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60))
    age = db.Column(db.Integer)

#    def __repr__(self):
#        return '<User: {}>'.format(self.name)
