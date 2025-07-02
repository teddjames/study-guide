from app import app
from db import db
from models import PhotographyWork, Review, Idea

with app.app_context():
    db.drop_all()
    db.create_all()

    # Add works
    w1 = PhotographyWork(title="Night Street", description="City lights.")
    w2 = PhotographyWork(title="Nature Calm", description="Forest mist.")
    db.session.add_all([w1, w2])
    db.session.commit()

    db.session.refresh(w1)
    db.session.refresh(w2)

    # Add reviews
    r1 = Review(work_id=w1.id, rating=5, comment="Stunning!")
    r2 = Review(work_id=w2.id, rating=4, comment="Very nice.")
    db.session.add_all([r1, r2])

    # Add ideas
    i1 = Idea(work_id=w1.id, title="Long exposure", description="Capture light trails.")
    i2 = Idea(work_id=w2.id, title="Fog series", description="Early morning fog shots.")
    db.session.add_all([i1, i2])

    db.session.commit()

    print("✅ Seed complete!")
