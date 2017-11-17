from CaseClass import CaseClass
import models

"""
Contains Case Classes of our filter predicates
"""

class PlayerFilter(CaseClass):
    def __init__(self, *cls: tuple):
        super().__init__()
        if cls[0]:
            self.conversion[cls] = tuple(models.Player.team == cls[0])
        self.convert(cls)


class CoachFilter(CaseClass):
    def __init__(self, *cls: tuple):
        super().__init__()
        if cls[0]:
            self.conversion[cls] = tuple(models.Coach.team == cls[0])
        self.convert(cls)

class SeasonFilter(CaseClass):
    def __init__(self, *cls: tuple):
        super().__init__()
        if cls[0]:
            self.conversion[tuple("afc")] = tuple(models.Season.afc_champion == models.Season.super_bowl_champion)
            self.conversion[tuple("nfc")] = tuple(models.Season.nfc_champion == models.Season.super_bowl_champion)
        self.convert(cls)