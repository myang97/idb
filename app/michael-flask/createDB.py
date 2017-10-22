from app.models import User
from app import db

michael = User(name="Michael Yang", age=20)
db.session.add(michael)
db.session.commit()
