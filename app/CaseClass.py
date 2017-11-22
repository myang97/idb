class CaseClass(object):

    @staticmethod
    def normal(keys):
        if keys:
            return any(k != None for k in keys)
        return False

    @staticmethod
    def init(init_function):
        def wrapper(*args):
            self = args[0]
            cls = args[1:] # a tuple of the string arguments
            self.conversion = {}
            if CaseClass.normal(cls):
                init_function(self, *cls)
            self.convert(cls)
        return wrapper

    def convert(self, cls):
        self.val = self.conversion.get(cls, tuple())

    def value(self):
        return self.val