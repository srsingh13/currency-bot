from src import app
from flask import request
from flask_restful import Resource, Api, reqparse
from requests import post,get
from json import dumps,loads


api = Api(app)

class Convert(Resource):
    def post(self):
        if request.method == "POST":
            url = 'https://api.fixer.io/latest'
            fromCurrency = request.form['from']
            toCurrency = request.form['to']
            value = request.form['value']
            
            params = {'base': fromCurrency,'symbols': toCurrency}
            
            response = get(url,params).json()
            rate = response['rates'][toCurrency]
            answer = rate*value
            return str(answer)
        else:
            return make_response("Bad request",300)

api.add_resource(Convert, '/Convert')
