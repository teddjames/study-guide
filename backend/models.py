from db import db
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

class PhotographyWork(db.Model):
    __tablename__ = "photography_works"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    reviews = db.relationship("Review", back_populates="work", cascade="all, delete-orphan")
    ideas   = db.relationship("Idea",    back_populates="work", cascade="all, delete-orphan")

    @hybrid_property
    def average_rating(self):
        if self.reviews:
            return sum(r.rating for r in self.reviews) / len(self.reviews)
        return None

class Review(db.Model):
    __tablename__ = "reviews"
    id       = db.Column(db.Integer, primary_key=True)
    work_id  = db.Column(db.Integer, db.ForeignKey("photography_works.id"))
    rating   = db.Column(db.Integer, nullable=False)
    comment  = db.Column(db.String)
    work     = db.relationship("PhotographyWork", back_populates="reviews")

    @validates("rating")
    def validate_rating(self, key, value):
        if not (1 <= value <= 5):
            raise ValueError("Rating must be 1–5.")
        return value

class Idea(db.Model):
    __tablename__ = "ideas"
    id          = db.Column(db.Integer, primary_key=True)
    work_id     = db.Column(db.Integer, db.ForeignKey("photography_works.id"))
    title       = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    work        = db.relationship("PhotographyWork", back_populates="ideas")


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)