from CaseClass import CaseClass
import models

"""
Contains Case Classes of our filter predicates
"""

class PlayerFilter(CaseClass):
    @CaseClass.case_class_init
    def __init__(self, *cls: tuple):
        self.conversion[cls] = tuple(models.Player.team == cls[0])

class CoachFilter(CaseClass):
    @CaseClass.case_class_init
    def __init__(self, *cls: tuple):
        self.conversion[cls] = tuple(models.Coach.team == cls[0])

class SeasonFilter(CaseClass):
    @CaseClass.case_class_init
    def __init__(self, *cls: tuple):
        self.conversion[tuple("afc")] = tuple(models.Season.afc_champion == models.Season.super_bowl_champion)
        self.conversion[tuple("nfc")] = tuple(models.Season.nfc_champion == models.Season.super_bowl_champion)