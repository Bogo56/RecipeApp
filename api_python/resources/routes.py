from flask_restful import Resource,Api,reqparse
from flask_jwt_extended import create_access_token,get_jwt,verify_jwt_in_request
from flask_jwt_extended import jwt_required
from flask import request
from seed.api_model import RecipeTables

api = Api()

##Using Flask-Restfull Extension to Build the Api structure and interface


# Endpoint for generating an access token, required to make requests the API
class GenerateToken(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("username", type=str,
                        required=True, help="Username cannot be blank")
    parser.add_argument("password", type=str,
                        required=True, help="Password cannot be blank")

    def post(self):
        request.get_json(force=True)
        args = self.parser.parse_args()
        check_username = RecipeTables.get_admin(args["username"])

        if check_username:
            if args["password"]==check_username[2]:
        # if the user has been authenticated we create an access token, which we would use in all requests after that, which
        # are wrapped in a @jwt_required decorator
                access_token = create_access_token(identity=args["username"])
                return {"info": {"token": access_token, "username": args["username"]}}
            else:
                return {"msg": "Bad username or password"},401
        else:
            return {"msg": "Bad username or password"}, 401


# Endpoint for getting a particular recipe. The ID is sent as a url parameter.
class Recipes(Resource):

    @jwt_required()
    def get(self,id):
        recipe = RecipeTables.find_recipe_by_id(id)
        ingredients = RecipeTables.find_ing_by_id(id)

        if recipe:
            return {"data":
                        {"recipe":{
                             "title":recipe[1],
                              "description":recipe[2],
                              "time":recipe[3],
                              "price":recipe[4],
                              "img_url":recipe[6],
                              "recipe_link":recipe[7],
                              "id":recipe[0]},
                         "ingredients":[{
                            "product":ing[1],
                            "qty":ing[2],
                            "unit":ing[3],
                             "recipe_id":recipe[0]} for ing in ingredients]
                        }
                    }

        else:
            return {"msg":"No such Recipe ID"}, 404


# Endpoint for searching recipes based on keyword.
class Search(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("query", type=str,
                        required=True, help="Please type a query")

    # Private method used inside the class to structure the data, before sending it.
    @staticmethod
    def _structure_data(data):
        res=[]
        for n in data:
            transformed = {
                             "title":n[1],
                              "description":n[2],
                              "time":n[3],
                              "price":n[4],
                              "img_url":n[6],
                              "recipe_link":n[7],
                              "id":n[0]}
            res.append(transformed)
        return res

    @jwt_required()
    def get(self):
        args = self.parser.parse_args()
        result = RecipeTables.search_recipe(args["query"])
        result= self._structure_data(result)
        if len(result) == 0 :
            return {"msg":"No recipes found for this query! Please try again ;)"}, 404
        return {"data":result}



api.add_resource(GenerateToken,"/api/get_token")
api.add_resource(Recipes,"/api/recipes/<string:id>")
api.add_resource(Search,"/api/recipes/search")