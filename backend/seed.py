from backend_backup.app import app
from backend_backup.db import db
from backend_backup.models import PhotographyWork, Review, Idea

with app.app_context():
    db.drop_all()
    db.create_all()

    w1 = PhotographyWork(title="Night Street", description="City lights.")
    w2 = PhotographyWork(title="Nature Calm", description="Forest mist.")
    db.session.add_all([w1, w2]); db.session.commit()

    db.session.add_all([
      Review(work_id=w1.id, rating=5, comment="Stunning!"),
      Review(work_id=w2.id, rating=4, comment="Very nice.")
    ])

    db.session.add_all([
      Idea(work_id=w1.id, title="Long exposure", description="Capture light trails."),
      Idea(work_id=w2.id, title="Fog series", description="Early morning fog shots.")
    ])
    db.session.commit()
    print("Seed complete.")
