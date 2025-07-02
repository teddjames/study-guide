import { useState, useEffect } from "react";
import "./App.css";
import SignupForm from "./SignupForm"; 
import WorksList from "./WorksLists";

function App() {
  const [user, setUser] = useState(null);
  const [works, setWorks] = useState([]);

  useEffect(() => {
    if (user) {
      fetch("http://localhost:5000/works")
        .then((r) => r.json())
        .then(setWorks);
    }
  }, [user]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>TJS Lightbox</h1>
        {!user ? (
          <SignupForm onSignup={setUser} /> 
        ) : (
          <>
            <p>Welcome, {user.username}!</p>
            <WorksList works={works} setWorks={setWorks} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
