from flask import Flask
from config import DevelopmentConfig,ProductConfig
from flask_jwt_extended import JWTManager
from resources.routes import api
from seed.api_model import RecipeTables
from pathlib import Path

# Configuring the Path to the database
RecipeTables.db = Path.cwd().joinpath("seed","recipes.db")

jwt = JWTManager()

app = Flask(__name__)

# Using Flask Factory pattern to build and load the API components.
def create_app():
    app.config.from_object(ProductConfig)

    jwt.init_app(app)
    api.init_app(app)

    return app


# Dealing with CORS policy, so that the API is more easily accessible.
# It's a simple API created for the sake of the Project only, so I guess it's OK in that case.
@app.after_request
def manage_cors(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add("Access-Control-Allow-Headers",
                         "Origin, X-Requested-With, Content-Type,"
                         " Accept, Authorization")
    return response

if  __name__=="__main__":
    app=create_app()
    app.run()