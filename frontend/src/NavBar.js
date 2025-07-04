import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const navStyle = {
    backgroundColor: 'black',
    padding: '1rem',
    borderBottom: '2px solid #39ff14',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkStyle = {
    color: '#39ff14',
    textDecoration: 'none',
    textShadow: '0 0 5px #39ff14',
    marginRight: '1.5rem',
    fontWeight: 'bold',
  };

  const navListStyle = {
    listStyleType: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
    alignItems: 'center',
  };

  const buttonStyle = {
    color: '#39ff14',
    border: '1px solid #39ff14',
    backgroundColor: 'transparent',
    textShadow: '0 0 5px #39ff14',
    padding: '5px 10px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={{ ...linkStyle, fontSize: '1.5rem' }}>Home</Link>

      <ul style={navListStyle}>
        {user ? (
          <>
            <li><Link to="/workslists" style={linkStyle}>WorksLists</Link></li>
            <li><button onClick={onLogout} style={buttonStyle}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" style={linkStyle}>Login</Link></li>
            <li><Link to="/signup" style={linkStyle}>Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
