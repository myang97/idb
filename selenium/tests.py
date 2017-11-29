import unittest, time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class TestNFLDB(unittest.TestCase):

    def setUp(self):
        fp = webdriver.FirefoxProfile()
        # Here "2" stands for "Automatic Proxy Configuration"
        fp.set_preference("network.proxy.type", 2)
        fp.set_preference("network.proxy.autoconfig_url",
                          "http://proxy-address-here:8080/")
        self.driver = webdriver.Firefox(firefox_profile=fp)
        self.addCleanup(self.driver.quit)
        self.siteBaseUrl = "https://nflsdb.com"
        self.driver.get(self.siteBaseUrl)

    def test_access_home_site(self):
        self.assertIn("NFLDB", self.driver.title)
        self.assertIn("https://nflsdb.com", self.driver.current_url)

    def test_access_players_site(self):
        self.test_access_home_site()
        self.driver.find_element_by_link_text("Players").click()
        self.assertIn("https://nflsdb.com/players", self.driver.current_url)

    def test_access_players_dropdown(self):
        self.test_access_players_site()
        self.driver.find_elements_by_class_name("Dropdown-control")[1].click()
        stuff = self.driver.find_elements_by_class_name("Dropdown-option")
        for things in stuff:
            if things.text == "49ers":
                things.click()
                break
        self.assertIn(self.driver.find_elements_by_class_name("Dropdown-control")[1].text, "49ers")

    def test_access_coaches_site(self):
        self.test_access_home_site()
        self.driver.find_element_by_link_text("Coaches").click()
        self.assertIn("https://nflsdb.com/coaches", self.driver.current_url)

    def test_access_coaches_dropdown(self):
        self.test_access_coaches_site()
        self.driver.find_elements_by_class_name("Dropdown-control")[1].click()
        stuff = self.driver.find_elements_by_class_name("Dropdown-option")
        for things in stuff:
            if things.text == "Vikings":
                things.click()
                break
        self.assertIn(self.driver.find_elements_by_class_name("Dropdown-control")[1].text, "Vikings")

    def test_access_teams_site(self):
        self.test_access_home_site()
        self.driver.find_element_by_link_text("Teams").click()
        self.assertIn("https://nflsdb.com/teams", self.driver.current_url)

    def test_access_teams_dropdown(self):
        self.test_access_teams_site()
        self.driver.find_elements_by_class_name("Dropdown-control")[1].click()
        stuff = self.driver.find_elements_by_class_name("Dropdown-option")
        for things in stuff:
            if things.text == "Bottom Ranking":
                things.click()
                break
        self.assertIn(self.driver.find_elements_by_class_name("Dropdown-control")[1].text, "Bottom Ranking")

    def test_access_seasons_site(self):
        self.test_access_home_site()
        self.driver.find_element_by_link_text("Seasons").click()
        self.assertIn("https://nflsdb.com/seasons", self.driver.current_url)

    def test_access_seasons_dropdown(self):
        self.test_access_seasons_site()
        self.driver.find_elements_by_class_name("Dropdown-control")[1].click()
        stuff = self.driver.find_elements_by_class_name("Dropdown-option")
        for things in stuff:
            if things.text == "AFC SB Champion":
                things.click()
                break
        self.assertIn(self.driver.find_elements_by_class_name("Dropdown-control")[1].text, "AFC SB Champion")

def test_access_about_site(self):
        self.test_access_home_site()
        self.driver.find_element_by_link_text("About").click()
        self.assertIn("nflsdb.com/about", self.driver.current_url)

if __name__ == '__main__':
    unittest.main(verbosity=2)