import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import "./App.css";
import SignupForm from "./SignupForm";
import WorksLists from "./WorksLists";
import Filter from "./Filter";
import Navbar from "./NavBar";
import Home from "./Home";
import Login from "./Login"; 

function App() {
  const [user, setUser] = useState(null);
  const [works, setWorks] = useState([]);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
  if (user) {
    fetch("http://127.0.0.1:5000/works", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch works");
        return res.json();
      })
      .then(setWorks)
      .catch(() => setError("Could not load works."));
    }
  }, [user]);


  const filteredWorks = works.filter((work) =>
    work.title.toLowerCase().includes(filterText.toLowerCase()) ||
    work.description.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Router>
      <Navbar user={user} onLogout={() => setUser(null)} />

      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm onSignup={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/workslists"
            element={
              user ? (
                <div>
                  <p>Welcome, {user?.username}!</p>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <Filter value={filterText} onChange={setFilterText} />
                  <WorksLists works={filteredWorks} setWorks={setWorks} />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
