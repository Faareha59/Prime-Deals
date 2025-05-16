import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import agentImg1 from '../assets/Agent/agent.webp';
import agentImg2 from '../assets/Agent/222.jpg';
import agentImg3 from '../assets/Agent/3.png';
import Footer from "../components/footer";
import { API_BASE_URL } from "../config";

function Agent() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch agents from the API
    const fetchAgents = async () => {
      try {
        console.log("Fetching agents from:", `${API_BASE_URL}/api/routeAgent/getAgents`);
        const response = await axios.get(`${API_BASE_URL}/api/routeAgent/getAgents`);
        console.log("Raw API response:", response);
        
        if (response.data && Array.isArray(response.data)) {
          // Log to debug what came back from the API
          console.log("Agents data from API:", response.data);
          
          // Filter out agents without names
          const validAgents = response.data.filter(agent => agent.name);
          console.log("Valid agents with names:", validAgents);
          
          if (validAgents.length > 0) {
            setAgents(validAgents);
          } else {
            console.warn("No agents with valid names found in API response");
            setError("No valid agents found. Using fallback data.");
            setAgents(fallbackAgents);
          }
        } else {
          // Fallback if response is not as expected
          console.error('Invalid API response format:', response.data);
          setError("Invalid data format received from server");
          setAgents(fallbackAgents);
        }
      } catch (error) {
        console.error('Error fetching agents:', error);
        setError("Failed to connect to the server. Using fallback data.");
        setAgents(fallbackAgents); // Use fallback data if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);
  
  // Fallback data if API call fails
  const fallbackAgents = [
    {
      profilePic: agentImg1,
      name: "Usama Ali",
      nationality: "Pakistani",
      location: "Islamabad, Pakistan",
      language: "English, Urdu",
      email: "usamaali@gmail.com",
      phoneNo: "+92 300 1234567",
      rating: 4.8,
      specialization: "Residential",
      experience: "5 years",
      bio: "A dedicated real estate agent specializing in luxury homes in Islamabad."
    },
    {
      profilePic: agentImg2,
      name: "Ejaz Ahmed",
      nationality: "Pakistani",
      location: "Lahore, Pakistan",
      language: "English, Urdu, Punjabi",
      email: "ejazahmed@gmail.com",
      phoneNo: "+92 322 9876543",
      rating: 4.9,
      specialization: "Commercial",
      experience: "8 years",
      bio: "An experienced commercial real estate specialist with expertise in office spaces."
    },
    {
      profilePic: agentImg3,
      name: "Ali Raza",
      nationality: "Pakistani",
      location: "Karachi, Pakistan",
      language: "English, Urdu, Sindhi",
      email: "ali.raza@gmail.com",
      phoneNo: "+92 333 1122334",
      rating: 4.7,
      specialization: "Industrial",
      experience: "6 years",
      bio: "Specializes in industrial and warehouse properties across Pakistan."
    },
  ];

  if (loading) {
    return (
      <div>
        <Header />
        <div style={styles.loadingContainer}>
          <p style={styles.loadingText}>Loading agents...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <h2 style={styles.pageTitle}>Our Professional Agents</h2>
        
        {error && (
          <div style={styles.errorMessage}>
            <p>{error}</p>
          </div>
        )}
        
        <div style={styles.agentGrid}>
          {agents.length === 0 ? (
            <div style={styles.noAgents}>
              <p>No agents available at the moment. Please check back later.</p>
            </div>
          ) : (
            agents.map((agent, idx) => (
              <div key={idx} style={styles.agentCard}>
                <img 
                  src={agent.profilePic || 'https://via.placeholder.com/150'}
                  alt={agent.name}
                  style={styles.profilePic}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
                <div style={styles.agentDetails}>
                  <h3 style={styles.agentName}>{agent.name}</h3>
                  <p><b>Nationality:</b> {agent.nationality || 'Not specified'}</p>
                  {agent.specialization && <p><b>Specialization:</b> {agent.specialization}</p>}
                  {agent.experience && <p><b>Experience:</b> {agent.experience}</p>}
                  <p><b>Location:</b> {agent.location || 'Not specified'}</p>
                  <p><b>Languages:</b> {agent.language || 'Not specified'}</p>
                  <p><b>Email:</b> {agent.email}</p>
                  <p><b>Phone:</b> {agent.phoneNo}</p>
                  <p><b>Rating:</b> {agent.rating || '4.5'} ⭐</p>
                  {agent.bio && <p style={styles.bio}><b>Bio:</b> {agent.bio}</p>}
                </div>
              </div>
            ))
          )}
        </div>
        <Footer style={styles.footer} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh", 
    backgroundColor: "#F4F8FB",
    padding: "40px 0 0 0",
  },
  pageTitle: {
    textAlign: "center",
    fontSize: "2.2em",
    fontWeight: "bold",
    color: "#1B4C7F",
    marginBottom: "30px",
  },
  agentGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "40px",
  },
  agentCard: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    padding: "30px 24px",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.2s",
    height: "fit-content",
  },
  profilePic: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "18px",
    border: "3px solid #1B4C7F",
  },
  agentDetails: {
    textAlign: "center",
    color: "#333",
    width: "100%",
  },
  agentName: {
    fontSize: "1.3em",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#1B4C7F",
  },
  footer: {
    marginTop: "40px",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh"
  },
  loadingText: {
    fontSize: "1.2em",
    color: "#1B4C7F"
  },
  errorMessage: {
    textAlign: "center",
    padding: "15px",
    margin: "0 auto 30px auto",
    maxWidth: "80%",
    backgroundColor: "#FFEBEE",
    borderRadius: "5px",
    color: "#D32F2F"
  },
  noAgents: {
    width: "100%",
    textAlign: "center",
    padding: "40px",
    color: "#666",
    fontSize: "1.1em"
  },
  bio: {
    textAlign: "left",
    margin: "15px 0 0 0",
    fontSize: "0.9em",
    lineHeight: "1.5",
    color: "#555"
  }
};

export default Agent;






