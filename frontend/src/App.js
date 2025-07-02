import { useState, useEffect } from "react";
import "./App.css";
import SignupForm from "./SignupForm";
import WorksList from "./WorksLists";

function App() {
  const [user, setUser] = useState(null);
  const [works, setWorks] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>TJ'S Showcase</h1>

        {!user ? (
          <SignupForm onSignup={setUser} />
        ) : (
          <>
            <p>Welcome, {user?.username || "Guest"}!</p>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <WorksList works={works} setWorks={setWorks} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
