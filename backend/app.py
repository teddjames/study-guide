from flask import Flask, request, jsonify, session, make_response
from flask_cors import CORS
from flask_session import Session
from config import Config
from db import db, migrate
from models import PhotographyWork, Review, Idea, User

app = Flask(__name__)
app.config.from_object(Config)
server_session = Session(app)
db.init_app(app)
migrate.init_app(app, db)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

@app.route('/')
def index():
    return "Welcome to Study Guide"

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 409

    user = User(
        username=username
    )
    user.password = password
    db.session.add(user)
    db.session.commit()

    session['user_id'] = user.id
    session.permanent = True
    return jsonify({"message": "User created", "user": user.to_dict()}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    
    user = User.query.filter_by(username=username).first()

    if not user or not user.authenticate(password):
        return {"error": "Invalid username or password."}, 401
    
    session['user_id'] = user.id
    session.permanent = True

    return make_response({"user": user.to_dict()}), 201
    

@app.route("/works", methods=["GET"])
def get_works():
    works = PhotographyWork.query.all()
    return jsonify([w.to_dict() for w in works]), 200

@app.route("/reviews", methods=["POST"])
def add_review():
    data = request.json
    review = Review(
        work_id=data["work_id"],
        rating=data["rating"],
        comment=data.get("comment")
    )
    db.session.add(review)
    db.session.commit()
    return jsonify({"message": "Review added", "review": review.to_dict()}), 201

@app.route("/reviews/<int:id>", methods=["DELETE"])
def del_review(id):
    r = Review.query.get(id)
    if r:
        db.session.delete(r)
        db.session.commit()
        return jsonify({"message": "Deleted"}), 200
    return jsonify({"error": "Not found"}), 404

@app.route("/ideas", methods=["POST"])
def add_idea():
    data = request.json
    idea = Idea(
        work_id=data["work_id"],
        title=data["title"],
        description=data.get("description")
    )
    db.session.add(idea)
    db.session.commit()
    return jsonify({"message": "Idea added"}), 201

@app.route("/ideas/<int:id>", methods=["DELETE"])
def del_idea(id):
    i = Idea.query.get(id)
    if i:
        db.session.delete(i)
        db.session.commit()
        return jsonify({"message": "Deleted"}), 200
    return jsonify({"error": "Not found"}), 404

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
