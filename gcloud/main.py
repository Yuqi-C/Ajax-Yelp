from flask import request, Flask
from flask_cors import CORS
import requests
import json
app = Flask(__name__)
CORS(app)

@app.route('/search')
def search():
    term = request.args.get('Keyword')
    categories = request.args.get('Category')
    status = request.args.get('status')
    distance = request.args.get('Distance')
    loc = status.split(',')
    latitude = float(loc[0])
    longitude = float(loc[1])
    if categories == "Default" :
        categories = "all"
    radius = int(1609.34 * float(distance))
    URL = "https://api.yelp.com/v3/businesses/search"
    params = {  'term': term,
                'latitude': latitude,
                'longitude': longitude,
                'categories': categories,
                'radius': radius
            }
    HEADER = {"Authorization": "Bearer w3N0hcpHPaR0qx4IEJtbXF5QGJ6-9zDWxZmVgHdTvHeWQRGVixoK6Q7X3BvaluP6nQ62pqx-fbvyiTZ9vVX-6R_DocAcFprTOifPuga0syoInNRU-iQH9sqbOHE2Y3Yx"}
    r = requests.get(url=URL, params=params, headers=HEADER)
    data = r.json()
    Arr = []
    for business in data['businesses']:
        temp = {
            'id': business['id'],
            'image': business['image_url'],
            'name': business['name'],
            'rating': business['rating'],
            'distance': business['distance']/1609.34
        }
        Arr.append(temp)
    return json.dumps(Arr)

@app.route('/searchId')
def searhId():
    URL = "https://api.yelp.com/v3/businesses/"
    id = request.args.get('id')
    HEADER = {"Authorization": "Bearer w3N0hcpHPaR0qx4IEJtbXF5QGJ6-9zDWxZmVgHdTvHeWQRGVixoK6Q7X3BvaluP6nQ62pqx-fbvyiTZ9vVX-6R_DocAcFprTOifPuga0syoInNRU-iQH9sqbOHE2Y3Yx"}
    r = requests.get(url = URL + id, headers = HEADER)
    data = r.json()
    return data
    