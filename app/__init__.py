from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app.config import Config
import logging

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
from flask_cors import CORS

def create_app(config_class=Config):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config_class)

    # Initialize Flask extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Setup logging with a custom format
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    handler = logging.FileHandler('app.log')
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)

    # Register blueprints
    from app.routes import bp as routes_bp
    app.register_blueprint(routes_bp, url_prefix='/api/v1')

    # Serve static files
    @app.route('/')
    def index():
        return send_from_directory('static', 'index.html')

    @app.route('/<path:path>')
    def static_files(path):
        return send_from_directory('static', path)

    return app