import React from 'react';
import logo from '../assets/Home/logo.png';
import { Link } from 'react-router-dom';
// import { FaBell, FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <header style={styles.header}>

      <div style={styles.logo}>
        <img src={logo} alt="PrimeDeals Logo" style={styles.logoImage} />
        <span style={styles.span}>PrimeDeals</span>
      </div>

      <nav style={styles.navLinks}>
        <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link>
        <Link to="/listings" style={{ textDecoration: 'none', color: '#fff' }}>Listings</Link>
        <Link to="/agents" style={{ textDecoration: 'none', color: '#fff' }}>Agents</Link>
        
        <Link to="/about" style={{ textDecoration: 'none', color: '#fff' }}>About</Link>
        <Link to="/contact" style={{ textDecoration: 'none', color: '#fff' }}>Contact</Link>
      </nav>

      <div style={styles.authButtons}>
        <button style={styles.signIn}><Link to="/signIn" style={{ textDecoration: 'none', color: 'Black'}}>Sign In</Link></button>
        <button style={styles.signUp}><Link to="/signUp" style={{ textDecoration: 'none', color: '#fff'}}>Sign Up</Link></button>
      </div>

    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    padding: '10px 20px',
    backgroundColor: '#1B4C7F',
    color: 'white',
    borderBottom: '1px solid #ddd',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    zIndex: 1000,
    boxShadow: '0 5px 8px rgba(0, 0, 0, 0.2)'
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px'
  },

  logoImage: {
    width: '40px',
    marginRight: '8px',
  },

  span : {
    fontWeight: 'bold',
    fontSize: '20px',
  },

  navLinks: {
    display: 'flex',
    gap: '30px',
    textDecoration: 'none',
    fontWeight: '500',
    margin: '10px 100px 0px 120px',
  },

  bellIcon: {
    width: '120%',
    height: '100%',
    fill: '#ffffff',
  },

  authButtons: {
    marginLeft: '300px',
    display: 'flex'
  },

  signIn: {
    marginLeft: '5px',
    marginRight: '10px',
    padding: '2px 20px',
    backgroundColor: '#ddd',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'none',
  },

  signUp: {
    marginLeft: '10px',
    padding: '2px 20px',
    backgroundColor: '#555',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'none',
  },
};



export default Header;