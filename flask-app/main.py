from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/coaches')
def coaches():
    return render_template('coaches.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/players')
def players():
    return render_template('players.html')

@app.route('/seasons')
def seasons():
    return render_template('seasons.html')

@app.route('/teams')
def teams():
    return render_template('teams.html')

@app.route('/billbelichick')
def billbelichick():
    return render_template('Coaches/billbelichick.html')

@app.route('/garykubiak')
def garykubiak():
    return render_template('Coaches/garykubiak.html')

@app.route('/petecarroll')
def petecarroll():
    return render_template('Coaches/petecarroll.html')

@app.route('/russellwilson')
def russellwilson():
    return render_template('players/russellwilson.html')

@app.route('/peytonmanning')
def peytonmanning():
    return render_template('players/peytonmanning.html')

@app.route('/tombrady')
def tombrady():
    return render_template('players/tombrady.html')
