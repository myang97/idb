# idb
This is the backend portion of the project. The database instantiation and the server/api calls will be here.

The basic set up right now is that the api.py launches a flask app.

We will need to set this up on GCP.

The current way it is divided is by model, 
first comes the definition os the list class, and then the member class.

eg: class PlayerListAPI followed by
    class PlayerAPI

Useful things for later:
  -rootURL variable can be replaced with whatever URL we  end up hosting on

  (...)_fields = {
  ...
  } 
  Type structures will let us decide what to return in specific contexts.  We could differentiate between what info to return when all players are called vs an individual.  Simply define a new _fields structure

  self.reqparse clauses ensure some minumum entries in the data 