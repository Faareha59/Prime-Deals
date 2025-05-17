import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AgentCRUD() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/routeAgent/getAgents");
        setAgents(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching agents:", err);
        setError("Error loading agents.");
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading agents...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Agent List</h2>
      <div style={styles.agentGrid}>
        {agents.map((agent) => (
          <div
            key={agent._id}
            style={styles.agentCard}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <img
              src={agent.profilePic}
              alt={`${agent.name}'s profile`}
              style={styles.agentProfilePic}
            />
            <div style={styles.agentName}>{agent.name}</div>
            <div style={styles.agentRating}>Rating: {agent.rating || "N/A"}</div>
            <Link to={`/agent/${agent._id}`} style={styles.agentLink}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#CCE5FF",
    fontFamily: "'Roboto', sans-serif",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#1B4C7F",
    textAlign: "center",
    marginTop: "20px",
  },
  agentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    width: "100%",
    maxWidth: "1200px",
    padding: "10px",
    margin: "0 auto",
  },
  agentCard: {
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  agentProfilePic: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "15px",
    objectFit: "cover",
    border: "3px solid #1B4C7F",
  },
  agentName: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
  },
  agentRating: {
    fontSize: "16px",
    color: "#555",
    marginTop: "8px",
  },
  agentLink: {
    color: "#1B4C7F",
    textDecoration: "none",
    fontWeight: "bold",
    marginTop: "15px",
    display: "inline-block",
    fontSize: "16px",
    border: "1px solid #1B4C7F",
    padding: "8px 15px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  loading: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
    color: "#1B4C7F",
  },
  error: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
    color: "red",
  },
};

export default AgentCRUD;
