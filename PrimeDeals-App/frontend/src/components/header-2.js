import React from 'react';
import { FaUser } from 'react-icons/fa';
import logo from '../assets/Home/logo.png';
import { Link } from 'react-router-dom';

const Header_2 = () => {
    return (

        <header style={styles.header}>
            <div style={styles.logoSection}>
                <img src={logo} alt="Logo" style={styles.logo} />
                <h1 style={styles.logoText}>PrimeDeals</h1>
            </div>

            <nav style={styles.nav}>
            <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link>
        <Link to="/listings" style={{ textDecoration: 'none', color: '#fff' }}>Listings</Link>
        <Link to="/agents" style={{ textDecoration: 'none', color: '#fff' }}>Agents</Link>
        
        <Link to="/about" style={{ textDecoration: 'none', color: '#fff' }}>About</Link>
        <Link to="/contact" style={{ textDecoration: 'none', color: '#fff' }}>Contact</Link>
                <FaUser style={styles.userIcon}/>
            </nav>
        </header>
       );
    }

const styles = {

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 5%",
        backgroundColor: "#1B4C7F",
    },

    logoSection: {
        display: "flex",
        alignItems: "center",
    },

    logo: {
        width: "40px",
        height: "40px",
        marginRight: "10px",
    },

      logoText: {
        color: "white",
        fontWeight: "bold",
        fontSize: "1.5em",
    },

    nav: {
        display: "flex",
        gap: "40px",
        marginRight: "20px",
    },

    navLink: {
        color: "white",
        textDecoration: "none",
        fontSize: "15px",
        marginTop: "10px",
    },

    userIcon: {
        color: "white",
        border: '2px solid #CFCFCF',
        padding : '10px',
        borderRadius: '50%',
        fontSize: "1.2em",
    },
}

export default Header_2;