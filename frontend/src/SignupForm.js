import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"

export default function SignupForm({ onSignup }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  function handleSubmit(e){
      e.preventDefault();
      const newUser = {
                username,
                password
            };

      fetch(`http://127.0.0.1:5000/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(newUser)
        })
          .then(async (r) => {
            const data = await r.json();
            if (!r.ok) throw new Error(data.error || 'Signup failed');
            onSignup(data.user);
            navigate('/workslists');
          })
          .catch((error) => console.error(error.message));
    }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Choose a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Create a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <button type="submit">Sign Up</button>

      <div>
            <span
              style={{ color: 'white' }}
              onClick={() => navigate('/login')}
            >
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#39ff14', textDecoration: 'none' }}>
                Login
              </Link>
            </span>
      </div>

    </form>
  );
}
