import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setUser }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e){
        e.preventDefault();

        const loginDetails = {
            username,
            password
        };

        fetch(`http://127.0.0.1:5000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(loginDetails)
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw new Error(data.error);
                setUser(data.user);
                navigate('/workslists');
            })
            .catch(err => console.error(err.message));
            }

    return (
        <div>
            <div>
                <h2>Study Guide Login</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        name = "username"
                        value = {username}
                        onChange = {(e) => setUsername(e.target.value)}
                        placeholder="Enter your username..."
                        required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name = "password"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        placeholder="Enter your placeholder..."
                        required
                    />
                </div>

                <button
                    type="submit"
                    >
                    Log In
                </button>

                <div className="text-center">
                    <span 
                       style={{ color: 'white' }}
                       onClick={() => navigate('/signup')}
                    >
                    Don’t have an account?{' '}
                    <Link to="/signup" style={{ color: '#39ff14', textDecoration: 'none' }}>
                        Sign up
                    </Link>
                    </span>
               </div>
            </form>
        </div>
    )
}

export default Login
