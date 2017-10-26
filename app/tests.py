from models import db, Player, Coach, Team, Season, getPlayer, getCoach, getSeason, getTeam
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
        # r = requests.get('http://www.nfldb.me/')
        # self.assertEqual(r.status_code, 200)


    def test_get_players1(self):
        with app.app_context():
            result = getPlayer('003f8716-bc1a-4328-9a98-80ed932eb4e5')
            self.assertEqual(result['birth_date'] == '1992-02-15')
            self.assertEqual(result['last_name'] == 'Ward')
            self.assertEqual(result['first_name'] == 'Terron')
            self.assertEqual(result['pic_link'] == 'http://www1.pictures.zimbio.com/gi/New+York+Jets+v+Oakland+Raiders+RV4xGoZQMJkx.jpg')
            self.assertEqual(result['rookie_year'] == 2015)
            self.assertEqual(result['weight'] == '201.0')

    def test_get_players2(self):
        with app.app_context():
            result = getPlayer('014038bd-e9b7-476f-b7bd-bd78a46a9a57')
            self.assertEqual(result['birth_date'] == '1994-05-08')
            self.assertEqual(result['last_name'] == 'Johnson')
            self.assertEqual(result['first_name'] == 'Austin')
            self.assertEqual(result['pic_link'] == 'http://media.gettyimages.com/photos/defensive-lineman-austin-johnson-of-penn-state-looks-on-during-the-picture-id514429570')
            self.assertEqual(result['rookie_year'] == 2016)
            self.assertEqual(result['weight'] == '314.0')

    def test_get_coaches1(self):
        with app.app_context():
            result = getCoach('003f8716-bc1a-4328-9a98-80ed932eb4e5')
            self.assertEqual(result['position'] == 'Offensive Coordinator')
            self.assertEqual(result['last_name'] == 'Goodwin')
            self.assertEqual(result['first_name'] == 'Harold')
            self.assertEqual(result['pic_link'] == 'https://cdn1.vox-cdn.com/uploads/chorus_image/image/52548825/637200888.0.jpeg')
            self.assertEqual(result['team'] == 'ARI')

    def test_get_coaches2(self):
        with app.app_context():
            result = getCoach('1870b014-38db-4339-a601-0740c4bdece6')
            self.assertEqual(result['position'] == 'Defensive Coordinator')
            self.assertEqual(result['last_name'] == 'Pagano')
            self.assertEqual(result['first_name'] == 'John')
            self.assertEqual(result['pic_link'] == 'http://cdn-jpg.si.com/sites/default/files/2014/05/chuck-pagano-360.jpg')
            self.assertEqual(result['team'] == 'LAC')

    def test_get_teams1(self):
        with app.app_context():
            result = getTeam('KC')
            self.assertEqual(result['team_name'] == 'Chiefs')
            self.assertEqual(result['venue_location'] == 'Kansas City, MO')
            self.assertEqual(result['division'] == 'AFC West')
            self.assertEqual(result['points_rank'] == 27)
            self.assertEqual(result['season_wins'] == 5)

    def test_get_teams2(self):
        with app.app_context():
            result = getTeam('GB')
            self.assertEqual(result['team_name'] == "Packers")
            self.assertEqual(result['venue_location'] == 'Green Bay, WI')
            self.assertEqual(result['division'] == 'NFC North')
            self.assertEqual(result['points_rank'] == 35)
            self.assertEqual(result['season_wins'] == 4)

    def test_get_seasons1(self):
        with app.app_context():
            result = getSeason('29')
            self.assertEqual(result['nfc_champion'] == "ATL")
            self.assertEqual(result['year'] == 2016)
            self.assertEqual(result['afc_champion'] == 'NE')
            self.assertEqual(result['start_date'] == '2016-09-08')
            self.assertEqual(result['end_date'] == '2017-01-01')

    def test_get_seasons2(self):
        with app.app_context():
            result = getSeason('28')
            self.assertEqual(result['nfc_champion'] == "CAR")
            self.assertEqual(result['year'] == 2015)
            self.assertEqual(result['afc_champion'] == 'DEN')
            self.assertEqual(result['start_date'] == '2015-09-10')
            self.assertEqual(result['end_date'] == '2016-01-03')

    # def test_add_players(self):
    #     print()
    #     example1 = models.Person("test_person_1", "CEO", "SF",
    #                              date.today(), "www.image.com", "SWEatshop1")
    #     db.session.add(example1)
    #     db.session.commit()
    #
    #     person1 = db.session.query(models.Person).filter_by(name="test_person_1").first()
    #     self.assertEqual(person1.title, "CEO")
    #     self.assertEqual(person1.location, "SF")
    #
    #     db.session.delete(example1)
    #     db.session.commit()
    #
    # def test_add_coaches(self):
    #     print()
    #
    # def test_add_teams(self):
    #     print()
    #
    # def test_add_seasons(self):
    #     print()

if __name__ == '__main__':
    unittest.main()

"""
"""

"""
"""
