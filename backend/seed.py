from app import app
from db import db
from models import PhotographyWork, Review, Idea

with app.app_context():
    db.drop_all()
    db.create_all()

    t1 = PhotographyWork(title="1", description="Math test on algebra and geometry.")
    t2 = PhotographyWork(title="2", description="Physics test on kinematics and forces.")
    t3 = PhotographyWork(title="3", description="Intro to Pytest and writing unit tests.")
    t4 = PhotographyWork(title="4", description="History quiz on World War II.")
    t5 = PhotographyWork(title="5", description="Biology: Photosynthesis and cell structures.")
    
    db.session.add_all([t1, t2, t3, t4, t5])
    db.session.commit()

    reflections = [
        Review(work_id=t1.id, rating=5, comment="Reviewed key algebra formulas—super helpful."),
        Review(work_id=t2.id, rating=4, comment="Need to practice free-body diagrams more."),
        Review(work_id=t3.id, rating=5, comment="Writing tests makes debugging easier!"),
        Review(work_id=t4.id, rating=3, comment="Memorization-heavy, need a better study strategy."),
        Review(work_id=t5.id, rating=4, comment="Diagrams helped me understand the concepts."),
    ]
    db.session.add_all(reflections)

    tips = [
        Idea(work_id=t1.id, title="Formula Sheet", description="Summarize all formulas on one page."),
        Idea(work_id=t1.id, title="Practice Problems", description="Do 15 geometry problems per day."),
        Idea(work_id=t2.id, title="Visual Aids", description="Use arrows to show direction of forces."),
        Idea(work_id=t3.id, title="Code Daily", description="Write one test per function."),
        Idea(work_id=t4.id, title="Timeline", description="Make a WWII timeline with key events."),
        Idea(work_id=t4.id, title="Flashcards", description="Use flashcards for important dates."),
        Idea(work_id=t5.id, title="Mind Maps", description="Create mind maps of cell structures."),
    ]
    db.session.add_all(tips)

    db.session.commit()
    print("✅ Study guide seed complete with multiple topics, reflections, and tips!")
