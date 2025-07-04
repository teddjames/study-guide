import os
from datetime import timedelta

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "sqlite:///app.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True
    SECRET_KEY = "1caaefccfbfe95b0ce06b9ea2566c6d0e55007f93d002939f50488be4cb1465c"
    SESSION_TYPE = "filesystem"
    SESSION_PERMANENT = True
    PERMANENT_SESSION_LIFETIME = timedelta(days=1)
    SESSION_USE_SIGNER = True

    SESSION_COOKIE_NAME = "ts_session"
    SESSION_KEY_PREFIX = "ts_session:"
    SESSION_COOKIE_HTTPONLY = True

    SESSION_COOKIE_SAMESITE = "Lax"
    SESSION_COOKIE_SECURE = False