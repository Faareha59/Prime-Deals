import React, { useState } from "react";
import logo from "../assets/Home/logo.png";
import AdminSidePanel from "./adminSidePanel";
import { FaBars, FaUserCircle } from "react-icons/fa";

const AdminHeader = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
  
    const togglePanel = () => {
      setIsPanelOpen(!isPanelOpen);
    };
  
    return (
      <header style={styles.header}>
        <div style={styles.leftSection}>
          <button onClick={togglePanel} style={styles.menuButton}>
            <FaBars style={styles.menuIcon} />
          </button>
          <div style={styles.logoContainer}>
            <img src={logo} alt="Logo" style={styles.logoImage} />
            <span style={styles.logoText}>PrimeDeals</span>
          </div>
        </div>
  
        <div style={styles.rightSection}>
          <div style={styles.userInfo}>
            <span style={styles.welcomeText}>Welcome, Admin</span>
            <FaUserCircle style={styles.userIcon} />
          </div>
        </div>
  
        {isPanelOpen && <AdminSidePanel togglePanel={togglePanel} />}
      </header>
    );
  };
  
  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#1B4C7F",
      color: "white",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    },
    leftSection: {
      display: "flex",
      alignItems: "center",
    },
    menuButton: {
      background: "none",
      border: "none",
      color: "white",
      cursor: "pointer",
      padding: "5px",
      marginRight: "15px",
      borderRadius: "4px",
      transition: "background-color 0.2s",
    },
    menuIcon: {
      fontSize: "22px",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
    },
    logoImage: {
      width: "35px",
      height: "35px",
      marginRight: "10px",
    },
    logoText: {
      fontWeight: "bold",
      fontSize: "20px",
      letterSpacing: "0.5px",
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    welcomeText: {
      fontSize: "14px",
      opacity: "0.9",
    },
    userIcon: {
      fontSize: "22px",
      color: "white",
    },
  };
  
  export default AdminHeader;