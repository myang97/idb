from models import db, Player, Coach, Team, Season
from main import app
import unittest
import requests


class TestNFLDB(unittest.TestCase):
    """
    Testing the NFLDB page
    """

        # def test_website_up(self):
        # """
        # Status code of 200 means that the website is up
        # """
        # r = requests.get('http://www.nflsdb.com/')
        # self.assertEqual(r.status_code, 200)


    def test_get_players1(self):
        with app.app_context():
            result = Player.lookup('003f8716-bc1a-4328-9a98-80ed932eb4e5')
            self.assertEqual(result['birth_date'], '1992-02-15')
            self.assertEqual(result['last_name'], 'Ward')
            self.assertEqual(result['first_name'], 'Terron')
            self.assertEqual(result['pic_link'], 'http://cover32.com/wp-content/uploads/2016/09/USATSI_9513150_164063748_lowres-e1472822262753.jpg')
            self.assertEqual(result['rookie_year'], 2015)
            self.assertEqual(result['weight'], 201.0)

    def test_get_players2(self):
        with app.app_context():
            result = Player.lookup('014038bd-e9b7-476f-b7bd-bd78a46a9a57')
            self.assertEqual(result['birth_date'], '1994-05-08')
            self.assertEqual(result['last_name'], 'Johnson')
            self.assertEqual(result['first_name'], 'Austin')
            self.assertEqual(result['pic_link'], 'http://bloximages.chicago2.vip.townnews.com/pressofatlanticcity.com/content/tncms/assets/v3/editorial/2/aa/2aa82624-5532-11e6-83f7-5747ed1ff351/579abc1dc996a.image.jpg?resize=1200%2C800')
            self.assertEqual(result['rookie_year'], 2016)
            self.assertEqual(result['weight'], 314.0)

    def test_get_coaches1(self):
        with app.app_context():
            result = Coach.lookup('1969df08-6df4-446e-8090-7f6729c22151')
            self.assertEqual(result['position'], 'Offensive Coordinator')
            self.assertEqual(result['last_name'], 'Goodwin')
            self.assertEqual(result['first_name'], 'Harold')
            self.assertEqual(result['pic_link'], 'http://www.gannett-cdn.com/-mm-/a093b53724d06bd26d8faf2b8eb467567a8cc03d/c=71-0-3330-2450&r=x513&c=680x510/local/-/media/2015/08/24/Phoenix/Phoenix/635760457921758000-cards-23.jpg')
            self.assertEqual(result['team'], 'ARI')

    def test_get_coaches2(self):
        with app.app_context():
            result = Coach.lookup('1870b014-38db-4339-a601-0740c4bdece6')
            self.assertEqual(result['position'], 'Defensive Coordinator')
            self.assertEqual(result['last_name'], 'Pagano')
            self.assertEqual(result['first_name'], 'John')
            self.assertEqual(result['pic_link'], 'http://cdn.fansided.com/wp-content/blogs.dir/229/files/2014/01/7760788.jpg')
            self.assertEqual(result['team'], 'LAC')

    def test_get_teams1(self):
        with app.app_context():
            result = Team.lookup('KC')
            self.assertEqual(result['team_name'], 'Chiefs')
            self.assertEqual(result['venue_location'], 'Kansas City, MO')
            self.assertEqual(result['division'], 'AFC West')
            self.assertEqual(result['points_rank'], 27)
            self.assertEqual(result['season_wins'], 5)

    def test_get_teams2(self):
        with app.app_context():
            result = Team.lookup('GB')
            self.assertEqual(result['team_name'], "Packers")
            self.assertEqual(result['venue_location'], 'Green Bay, WI')
            self.assertEqual(result['division'], 'NFC North')
            self.assertEqual(result['points_rank'], 34)
            self.assertEqual(result['season_wins'], 4)

    def test_get_seasons1(self):
        with app.app_context():
            result = Season.lookup('29')
            self.assertEqual(result['nfc_champion'], "ATL")
            self.assertEqual(result['year'], 2016)
            self.assertEqual(result['afc_champion'], 'NE')
            self.assertEqual(result['start_date'], '2016-09-08')
            self.assertEqual(result['end_date'], '2017-01-01')

    def test_get_seasons2(self):
        with app.app_context():
            result = Season.lookup('28')
            self.assertEqual(result['nfc_champion'], "CAR")
            self.assertEqual(result['year'], 2015)
            self.assertEqual(result['afc_champion'], 'DEN')
            self.assertEqual(result['start_date'], '2015-09-10')
            self.assertEqual(result['end_date'], '2016-01-03')


if __name__ == '__main__':
    unittest.main()

"""
"""

"""
"""
