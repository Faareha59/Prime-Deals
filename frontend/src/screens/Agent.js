import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header_2 from "../components/header-2";
import img2 from '../assets/Agent/222.jpg';
import agent from '../assets/Agent/agent.webp';
import image from "../assets/Agent/apartment9.jpeg"; 
import Footer from "../components/footer";
import whatsapp from "../assets/Agent/whatsapp.svg";
import facebook from "../assets/Agent/facebook.svg";

function Agent() {
  const { agentId } = useParams(); // Fetch agent id from URL params
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        // Fetch agent data by ID
        const response = await axios.get(`http://localhost:3001/api/routeAgent/${agentId}`);
        setAgent(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching agent data:", err);
        setError("Error loading agent data.");
        setLoading(false);
      }
    };

    fetchAgentData();
  }, [agentId]);  // Update whenever agentId changes

  if (loading) {
    return <div>Loading agent data...</div>;
  }

  if (error || !agent) {
    return <div>{error || "Error loading agent data."}</div>;
  }

  return (
    <div>
    <Header_2 />
    <div style={styles.container}>
     
      <div style={styles.agentInfo}>
        <div style={styles.header}>
          <div style={styles.profilePic}>
            <img 
              src={agent.profilePic}
              alt="Profile" 
              style={{ width: "100%", height: "100%" }} 
            />
          </div>
          <div style={styles.agentDetails}>
            <h2 style={styles.agentName}>{agent.name}</h2>
          </div>
        </div>
        <div style={styles.about}>
          <h3 style={styles.sectionTitle}>About</h3>
          <div style={styles.cont}>
            <div style={styles.info}> 
              <p>Nationality: {agent.nationality}</p>
              <p>Location: {agent.location}</p>
              <p>Languages: {agent.language}</p>
              <p>Email: {agent.email}</p>
              <p>Phone: {agent.phoneNo}</p>
              <p>Rating: {agent.rating}</p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '55px', gap: '10px' }}>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img 
            src={whatsapp} 
            alt="WhatsApp" 
            style={{ width: '40px', height: '40px', cursor: 'pointer' }} 
            onClick={() => alert('WhatsApp icon clicked!')} // Placeholder action
        />
        <p style={{ fontSize: '12px', marginTop: '5px', color: '#53A0FF', textDecoration: 'underline' }}>WhatsApp</p>
    </div>
    
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img 
            src={facebook} 
            alt="Facebook" 
            style={{ width: '35px', height: '40px', cursor: 'pointer' }} 
            onClick={() => alert('Facebook icon clicked!')} // Placeholder action
        />
        <p style={{ fontSize: '12px', marginTop: '5px', color: '#53A0FF', textDecoration: 'underline' }}>Facebook</p>
    </div>
</div>

        <div style={styles.properties}>
          <h3 style={styles.sectionTitle}>My Properties</h3>
          <p style={styles.propertyCount}>1 property listed</p>
          <div style={styles.propertyListing}>
            <div style={styles.propertyImage}>
              <img 
                src={image} 
                alt="Property" 
                style={{ width: "50%", height: "20%", borderRadius: "8px" }} 
              />
            </div>
            <div style={styles.propertyDetails}>
              <div style={styles.propertyInfo}>
                <p style={styles.price}>PKR 2.8 Crore</p>
                <p style={styles.location}>D-12, Islamabad</p>
                <div style={styles.icons}>
                  <span>2 🛏️</span>
                  <span>2 🛁</span>
                </div>
                <button style={styles.buyButton}>BUY</button>
              </div>
              <div style={styles.propertyInfo}>
                <p style={styles.price}>PKR 1,30,000</p>
                <p style={styles.location}>D-12, Islamabad</p>
                <div style={styles.icons}>
                  <span>2 🛏️</span>
                  <span>2 🛁</span>
                </div>
                <button style={styles.rentButton}>RENT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer style={styles.footer} />
          </div>
          </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", 
    width: "90%",
    margin: "0 auto",
    backgroundColor: "white",
  },
  agentInfo: {
    flex: 1, 
    padding: "20px",
    backgroundColor: "#CCE5FF",
    borderRadius: "8px",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
  },
  footer: {
    marginTop: "20px", 
  },
  navbar: {
    backgroundColor: '#1B4C7F',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    color: '#fff',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  },
  navLinksContainer: {
    display: 'flex',
    gap: '15px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    margin: '0 12px',
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px"
  },
  profilePic: {
    width: "100px",
    height: "100px",
    backgroundColor: "#ccc",
    marginRight: "20px",
    marginTop:"1%"
  },
  agentDetails: {
    color: "#333"
  },
  agentName: {
    fontSize: "1.4em",
    fontWeight: "bold",
    marginBottom: "5px"
  },
  agentStats: {
    fontSize: "0.9em",
    color: "#555",
    margin: "2px 0"
  },
  about: {
    marginTop: "20px",
    fontSize: "0.9em",
    color: "#333"
  },
  sectionTitle: {
    fontSize: "1.5em",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  properties: {
    marginTop: "20px"
  },
  propertyCount: {
    fontSize: "0.9em",
    color: "#555",
    marginBottom: "15px"
  },
  propertyListing: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start"
  },
  propertyImage: {
    width: "40%",
    position: "relative",
    marginLeft:"2%"
  },
  favoriteButton: {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    fontSize: "0.8em",
    color: "#333",
    backgroundColor: "#FA5F55",
    border: "none",
    padding: "4px 8px",
    cursor: "pointer",
    borderRadius: "5px"
  },
  propertyDetails: {
    marginLeft:"-20%",
    width: "70%",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "8px"
  },
  propertyInfo: {
    textAlign: "center",
    color: "#333",
    width: "45%"
  },
  price: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px"
  },
  location: {
    fontSize: "0.85em",
    color: "#777",
    marginBottom: "10px"
  },
  icons: {
    display: "flex",
    gap: "10px",
    fontSize: "0.9em",
    color: "#555",
    marginBottom: "10px",
    justifyContent: "center"
  },
  buyButton: {
    padding: "8px 20px",
    fontSize: "0.9em",
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#2c8f9d",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    textTransform: "uppercase"
  },
  rentButton: {
    padding: "8px 20px",
    fontSize: "0.9em",
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#2c8f9d",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    textTransform: "uppercase"
  },
  cont: {
    display: "flex",
    gap: "100px"
  },
  info: {
    fontSize: "1.2em",
    fontWeight: "bold"
  },
  info1: {
    fontSize: "1.2em"
  }
};


export default Agent;

