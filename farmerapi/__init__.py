from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

from .views import main
app.register_blueprint(main)
