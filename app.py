from flask import Flask, Response, request, json, abort, _app_ctx_stack

app = Flask(__name__, static_url_path='')
app.config.from_object(__name__)
app.debug = True


@app.route("/", methods=['GET'])
def index():
    # print request.form['username']
    return app.send_static_file('index.html')
    #return send_from_directory('/pages', 'index.html')

@app.route("/login/", methods=['GET', 'POST'])
def login():
    print 'hi'
    passcode = json.loads(request.data)['passcode']
    print passcode
    data = open('data.json', 'r')
    households = json.load(data)
    # TODO get household with that passcode out of data store
    try:
        household = households[passcode]
        data.close()
        return Response(json.dumps(household), status=201, mimetype='application/json')
    except KeyError:
        # if no matching household, return Unauthorized
        abort(401)

@app.route("/rsvp/", methods=['GET', 'POST'])
def rsvp():
    print request.form
    print request.form['passcode']
    print request.form['rsvp-options']
    print request.form['carpooling']
    print request.form['fav-song']
    print request.form['comments']
    passcode = request.form['passcode']
    data = open('data.json', 'w')
    households = json.load(data)
    household = households[passcode]
    print household
    print json.loads(request.form)
    data.close()
    return Response(status=200)
    # return Response(json.dumps(rsvp), status=201, mimetype='application/json')

if __name__ == "__main__":
    app.run()