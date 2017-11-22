from CaseClass import CaseClass
import models

"""
Contains Case Classes of our filter predicates
"""

class PlayerFilter(CaseClass):
    @CaseClass.init
    def __init__(self, *cls: tuple):
        self.conversion[cls] = (models.Player.team == cls[0],)

class CoachFilter(CaseClass):
    @CaseClass.init
    def __init__(self, *cls: tuple):
        self.conversion[cls] = (models.Coach.team == cls[0],)

class SeasonFilter(CaseClass):
    @CaseClass.init
    def __init__(self, *cls: tuple):
        self.conversion[tuple("afc")] = (models.Season.afc_champion == models.Season.super_bowl_champion,)
        self.conversion[tuple("nfc")] = (models.Season.nfc_champion == models.Season.super_bowl_champion,)