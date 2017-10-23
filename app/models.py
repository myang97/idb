
from app import db

class Player(db.model):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name',type=str,required=True,
            help='No name provided',location='json')
        super(PlayerListAPI, self).__init__()

    def get(self):
        return {'Players': [marshal(player, player_fields) for player in players]}