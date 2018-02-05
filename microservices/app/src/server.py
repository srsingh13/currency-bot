from src import app
from flask import request
from flask_restful import Resource, Api, reqparse
from requests import post,get
from json import dumps,loads


api = Api(app)

class Convert(Resource):
    def get(self,fromCurrency,toCurrency,value):
        if request.method == "GET":
            url = 'https://api.fixer.io/latest'
            params = {'base': fromCurrency,'symbols': toCurrency}
            res = get(url,params).json()
            rate = res['rates'][toCurrency]
##            resText = "The value of " + request.data['value']
##            + " " + request.data['from'] + " in " + request.data['to']
##            + " is " + rate
            
            return rate*value

api.add_resource(Convert, '/Convert?from=<string:fromCurrenct>&to=<string:toCurrency>&value=<integer:value>')
