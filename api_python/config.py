from datetime import timedelta


class DevelopmentConfig:

    TESTING = True
    DEBUG = True
    ENV = "development"
    JWT_SECRET_KEY = "super_secret"
    JWT_ACCESS_TOKEN_EXPIRES= timedelta(seconds=30)
    JWT_TOKEN_LOCATION = ["headers","query_string"]
    SQLALCHEMY_DATABASE_URI = "sqlite:///models/test.db"


class ProductConfig:

    TESTING = False
    DEBUG = False
    ENV = "production"
    JWT_SECRET_KEY = "super_secret"
    JWT_ACCESS_TOKEN_EXPIRES= timedelta(minutes=15)
    JWT_TOKEN_LOCATION = ["headers","query_string"]
    PROPAGATE_EXCEPTIONS = True
