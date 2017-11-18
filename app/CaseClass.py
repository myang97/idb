class CaseClass(object):

    @staticmethod
    def normal(keys):
        if keys:
            return any(k != None for k in keys)
        return False

    @staticmethod
    def case_class_init(func):
        def func_wrapper(self, *cls: tuple):
            self.conversion = {}
            if CaseClass.normal(cls):
                return func(self, *cls)
            self.convert(cls)
        return func_wrapper

    def convert(self, cls):
        self.val = self.conversion.get(cls, tuple())

    def value(self):
        return self.val