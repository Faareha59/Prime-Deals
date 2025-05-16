import React from "react";
import { FaUser, FaTachometerAlt, FaHome, FaSignOutAlt, FaChevronRight, FaUserTie } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const AdminSidePanel = ({ togglePanel }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    try {
      // Only clear authentication-related data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Close the side panel
      togglePanel();
      
      // Navigate to home page instead of sign-in
      navigate('/');
      
      // Optional: Show a success message
      alert('Successfully signed out');
    } catch (error) {
      console.error('Error during sign out:', error);
      alert('Error signing out. Please try again.');
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.panel}>
        <button onClick={togglePanel} style={styles.closeButton}>
          ✕
        </button>

        <div style={styles.profileSection}>
          <div style={styles.profilePic}>
            <FaUser style={styles.userIcon} />
          </div>
          <h3 style={styles.adminName}>Admin Name</h3>
          <p style={styles.adminEmail}>Admin Email ID</p>
        </div>

        <div style={styles.divider}></div>

        <nav style={styles.nav}>
          <Link 
            to="/dashboard" 
            style={{
              ...styles.navItem,
              ...(isActive('/dashboard') ? styles.activeNavItem : {})
            }}
          >
            <FaTachometerAlt style={styles.navIcon} /> 
            <span style={styles.navText}>Dashboard</span>
            {isActive('/dashboard') && <FaChevronRight style={styles.activeIndicator} />}
          </Link>
          
          <Link 
            to="/properties" 
            style={{
              ...styles.navItem,
              ...(isActive('/properties') ? styles.activeNavItem : {})
            }}
          >
            <FaHome style={styles.navIcon} /> 
            <span style={styles.navText}>Property Lists</span>
            {isActive('/properties') && <FaChevronRight style={styles.activeIndicator} />}
          </Link>
          
          <Link 
            to="/agents-management" 
            style={{
              ...styles.navItem,
              ...(isActive('/agents-management') ? styles.activeNavItem : {})
            }}
          >
            <FaUserTie style={styles.navIcon} /> 
            <span style={styles.navText}>Agents</span>
            {isActive('/agents-management') && <FaChevronRight style={styles.activeIndicator} />}
          </Link>

          <div style={styles.spacer}></div>
          
          <button onClick={handleSignOut} style={styles.signOutButton}>
            <FaSignOutAlt style={styles.signOutIcon} /> 
            <span style={styles.signOutText}>Sign Out</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000,
  },

  panel: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "250px",
    height: "100%",
    backgroundColor: "#1B4C7F",
    color: "white",
    padding: "20px",
    boxShadow: "3px 0 15px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    zIndex: 1001,
  },

  closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "none",
    border: "none",
    color: "white",
    fontSize: "22px",
    cursor: "pointer",
    opacity: 0.8,
    transition: "opacity 0.2s",
  },

  profileSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: "25px",
  },

  profilePic: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "3px solid rgba(255, 255, 255, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "15px",
  },

  userIcon: {
    fontSize: "36px",
    color: "white",
  },

  adminName: {
    fontSize: "18px",
    fontWeight: 600,
    margin: "0 0 5px 0",
  },

  adminEmail: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.7)",
    margin: 0,
  },

  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    margin: "10px 0 20px 0",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    flex: 1,
  },

  navItem: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "white",
    padding: "12px 15px",
    borderRadius: "8px",
    transition: "all 0.2s",
    position: "relative",
  },

  activeNavItem: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    fontWeight: 600,
  },

  navIcon: {
    fontSize: "18px",
    marginRight: "10px",
  },

  navText: {
    fontSize: "16px",
  },

  activeIndicator: {
    position: "absolute",
    right: "15px",
    fontSize: "12px",
  },

  spacer: {
    flex: 1,
    minHeight: "20px",
  },

  signOutButton: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    background: "none",
    border: "none",
    color: "#ff6b6b",
    padding: "12px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.2s",
    textAlign: "left",
    marginTop: "10px",
    marginBottom: "30px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    paddingTop: "15px",
    paddingBottom: "15px",
  },

  signOutIcon: {
    fontSize: "18px",
    marginRight: "10px",
  },

  signOutText: {
    fontSize: "16px",
  },
};

export default AdminSidePanel;
