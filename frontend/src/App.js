import { useState, useEffect } from "react";
import "./App.css";
import SignupForm from "./SignupForm";
import WorksList from "./WorksLists";
import Filter from "./Filter";

function App() {
  const [user, setUser] = useState(null);
  const [works, setWorks] = useState([]);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState(""); // New state for filter

  useEffect(() => {
    if (user) {
      fetch("http://localhost:5000/works")
        .then((res) => {
          console.log("Fetch /works status:", res.status);
          if (!res.ok) throw new Error("Failed to fetch works");
          return res.json();
        })
        .then((data) => {
          console.log("Fetched works:", data);
          setWorks(data);
        })
        .catch((err) => {
          console.error("Error fetching works:", err);
          setError("Could not load works.");
        });
    }
  }, [user]);

  // Filter works based on title or description
  const filteredWorks = works.filter((work) =>
    work.title.toLowerCase().includes(filterText.toLowerCase()) ||
    work.description.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Study Guide</h1>

        {!user ? (
          <SignupForm onSignup={setUser} />
        ) : (
          <>
            <p>Welcome, {user?.username || "Guest"}!</p>
            <button onClick={() => setUser(null)}>Log out</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <Filter value={filterText} onChange={setFilterText} />
            <WorksList works={filteredWorks} setWorks={setWorks} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
