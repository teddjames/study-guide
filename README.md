# Study Guide 
A full‑stack study guide app built with a Flask API (SQLite + SQLAlchemy) and a React frontend.
This app is designed for students to perform various tasks, including signing up, logging in, logging out, browsing works/study topics, filtering by title, leaving 1–5 star reflections, and suggesting study tips or creative ideas.

## Features
User Authentication
– Sign up with username & password
– Log in and out
– Session persists on page reload


Reviews / Reflections
– Add 1–5 star reflections with optional comments
– Delete reflections
– Average rating updates automatically

Ideas / Tips
– Submit study tips or creative ideas for each work
– Delete tips

Frontend / Backend Integration
– Secure cookie-based sessions
– Cross-Origin support (CORS with credentials)


## Project Structure
```bash
tjs‑showcase/
├── backend/
│   ├── app.py                # Flask app, routes, CORS, sessions
│   ├── config.py             # DB & secret‑key settings
│   ├── db.py                 # SQLAlchemy instance
│   ├── models.py             # User, PhotographyWork, Review, Idea
│   ├── seed.py               # Populate DB with demo data
│   ├── requirements.txt
│   └── venv/                 # (git‑ignored)
└── frontend/
    ├── public/index.html
    └── src/
        ├── App.js            # Handles auth flow + routes
        ├── LoginForm.js
        ├── SignupForm.js
        ├── WorksList.js
        ├── WorkCard.js
        ├── Filter.js
        ├── index.js
        └── index.css
```


## Auth Flow
1. Sign Up → POST /signup

On success, backend sets session["user_id"] and returns the user object.

Frontend stores user in React state.

2.Login → POST /auth/login

Credentials sent with credentials:"include".

On 200, backend sets session["user_id"]; frontend saves user.

3. Session Check → GET /check_session

Called on page load; restores user if cookie is present.

4. Logout → DELETE /logout

Clears session cookie on backend; frontend resets user state.

All cookies are SameSite=Lax (default) and accepted by the React app when credentials:"include" is used.

## Backend Setup
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python seed.py            # populate DB
export FLASK_APP=app.py
flask run --port 5000
API now runs at http://localhost:5000
```


## Frontend Setup
```bash
cd frontend
npm install
npm start          # opens http://localhost:3000
```

Add "proxy": "http://localhost:5000" in package.json if you prefer to omit full URLs in fetch calls.

## Key API Endpoints

| Method | Path               | Purpose                                               |
|--------|--------------------|--------------------------------------------------------|
| POST   | `/signup`          | Register new user (auto‑login)                        |
| POST   | `/auth/login`      | Log in (expects JSON `{username, password}`)         |
| DELETE | `/logout`          | Log out (clears session)                              |
| GET    | `/check_session`   | Return current user if logged in                      |
| GET    | `/works`           | List all works (includes reviews & ideas)             |
| POST   | `/reviews`         | Create reflection `{work_id, rating, comment}`        |
| DELETE | `/reviews/<id>`    | Delete reflection                                     |
| POST   | `/ideas`           | Create tip `{work_id, title, description}`            |
| DELETE | `/ideas/<id>`      | Delete tip                                            |


## Tech Stack
Layer	Tools
Backend	Python · Flask · Flask‑SQLAlchemy · Flask‑CORS · SQLite
Auth	Flask sessions (cookie‑based)
Frontend	React 18 · Fetch API (credentials:"include")
Styling	Plain CSS — retro neon “Codédex” vibe

## Quick Test Checklist
Sign Up ➜ User is auto‑logged in.

Log Out ➜ Page returns to auth screen.

Log In with same credentials ➜ Gallery loads.

Add / delete reflections & tips ➜ Average score updates.

Refresh page ➜ Session persists (still logged in).

CORS errors: none in browser console.

Happy studying!
