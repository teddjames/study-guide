from db import db
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from werkzeug.security import generate_password_hash, check_password_hash

class PhotographyWork(db.Model, SerializerMixin):
    serialize_rules = ("-reviews.work", "-ideas.work")

    __tablename__ = "photography_works"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    
    reviews = db.relationship("Review", back_populates="work", cascade="all, delete-orphan")
    ideas = db.relationship("Idea", back_populates="work", cascade="all, delete-orphan")

    @hybrid_property
    def average_rating(self):
        if self.reviews:
            return round(sum(r.rating for r in self.reviews) / len(self.reviews), 2)
        return None

class Review(db.Model, SerializerMixin):
    serialize_rules = ("-work.reviews", "-work.ideas")

    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    work_id = db.Column(db.Integer, db.ForeignKey("photography_works.id"))
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String)

    work = db.relationship("PhotographyWork", back_populates="reviews")

    @validates("rating")
    def validate_rating(self, key, value):
        if not (1 <= value <= 5):
            raise ValueError("Rating must be between 1 and 5.")
        return value

class Idea(db.Model, SerializerMixin):
    serialize_rules = ("-work.ideas", "-work.reviews")

    __tablename__ = "ideas"
    id = db.Column(db.Integer, primary_key=True)
    work_id = db.Column(db.Integer, db.ForeignKey("photography_works.id"))
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)

    work = db.relationship("PhotographyWork", back_populates="ideas")

class User(db.Model, SerializerMixin):
    serialize_rules = ("-_password_hash",)
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    _password_hash = db.Column(db.String(120), nullable=False)

    @hybrid_property
    def password(self):
        return "Password hashes may not be viewed directly"
    
    @password.setter
    def password(self, plain_password):
        password_hash = generate_password_hash(plain_password)
        self._password_hash = password_hash

    def authenticate(self, plain_password):
        return check_password_hash(self._password_hash, plain_password)
