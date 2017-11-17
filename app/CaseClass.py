class CaseClass(object):
    def __init__(self):
        self.conversion = {(None,) : tuple()}

    def convert(self, cls):
        self.val = self.conversion.get(cls, self.conversion[(None,)])

    def value(self):
        return self.val