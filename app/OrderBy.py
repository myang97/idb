from CaseClass import CaseClass
import models

"""
Contains case classes for ordering our DB models
"""

class OrderByPlayer(CaseClass):
    @CaseClass.case_class_init
    def __init__(self, *cls: tuple):
        self.conversion[("ascending",)] = (models.Player.first_name,)
        self.conversion[("descending",)] = (models.Player.first_name.desc(),)

class OrderByCoach(CaseClass):
    @CaseClass.case_class_init
    def __init__(self, *cls: tuple):
        self.conversion[("ascending",)] = (models.Coach.first_name,)
        self.conversion[("descending",)] = (models.Coach.first_name.desc(),)

class OrderByTeam(CaseClass):
    @CaseClass.case_class_init
    def __init__(self, *cls: tuple):
        self.conversion[("ascending", "top16")] = (models.Team.conference_rank, models.Team.team_name)
        self.conversion[("ascending", "bottom16")] = (models.Team.conference_rank.desc(), models.Team.team_name)
        self.conversion[("ascending", None)] = (models.Team.team_name,)
        self.conversion[("descending", "top16")] = (models.Team.conference_rank, models.Team.team_name.desc())
        self.conversion[("descending", "bottom16")] = (models.Team.conference_rank.desc(), models.Team.team_name.desc())
        self.conversion[("descending", None)] = (models.Team.team_name.desc(),)
        self.conversion[(None, "top16")] = (models.Team.conference_rank,)
        self.conversion[(None, "bottom16")] = (models.Team.conference_rank.desc(),)
        self.conversion[(None, None)] = tuple()

class OrderBySeason(CaseClass):
    @CaseClass.case_class_init
    def __init__(self, *cls: tuple):
        self.conversion[("ascending",)] = (models.Season.year,)
        self.conversion[("descending",)] = (models.Season.year.desc(),)