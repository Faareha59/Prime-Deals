import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/Home/logo.png';
import AdminHeader from "../components/adminHeader";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from "recharts";
import axios from "axios";

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/signIn');
      return;
    }

    // Fetch properties
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/listings');
        setProperties(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties');
        setLoading(false);
      }
    };

    fetchProperties();
  }, [navigate]);

  // Dummy data for charts (you can replace with real data later)
  const trafficData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    users: Math.floor(Math.random() * 6000),
  }));

  const buyRentData = [
    { name: "Houses", Rent: 100, Buy: 250 },
    { name: "Apartments", Rent: 300, Buy: 150 },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <AdminHeader />

      {/* Main Content */}
      <div style={styles.content}>

        <div style={styles.titleContainer}>
        <h2 style={styles.title}>Admin Dashboard</h2>
        </div>

        {/* Properties Table */}
        <div style={styles.tableContainer}>
          <h3 style={styles.tableTitle}>Properties</h3>
          <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Location</th>
                  <th style={styles.th}>Buy</th>
                  <th style={styles.th}>Rent</th>
                  <th style={styles.th}>Beds</th>
                  <th style={styles.th}>Baths</th>
                  <th style={styles.th}>Description</th>
                  <th style={styles.th}>Features</th>
                </tr>
              </thead>
              <tbody>
              {properties.map((property) => (
                <tr key={property._id} style={styles.tr}>
                  <td style={styles.td}>{property._id}</td>
                  <td style={styles.td}>{property.propertyType}</td>
                  <td style={styles.td}>{property.location}</td>
                  <td style={styles.td}>{property.priceBuy}</td>
                  <td style={styles.td}>{property.priceRent}</td>
                  <td style={styles.td}>{property.beds}</td>
                  <td style={styles.td}>{property.baths}</td>
                  <td style={styles.td}>{property.description}</td>
                  <td style={styles.td}>{property.features}</td>
                </tr>
              ))}
            </tbody>
            </table>
              <button 
                style={styles.viewAllButton}
                onClick={() => navigate('/properties')}
              >
                View All
              </button>
          </div>

        {/* Charts */}
        <div style={styles.charts}>
          <div style={styles.chart}>
            <h3>Website Traffic</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" label={{ value: "Days", position: "insideBottom" }} />
                <YAxis label={{ value: "Users", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={styles.chart}>
            <h3>Buy and Rent</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={buyRentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Rent" fill="#8884d8" />
                <Bar dataKey="Buy" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      </div>
  );
};

const styles = {
  header: {
    display: "flex",
    padding: "10px 20px",
    backgroundColor: "#1B4C7F",
    color: "white",
    borderBottom: "1px solid #ddd",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },

  logo: {
    display: "flex",
    alignItems: "center",
  },

  logoImage: {
    width: "40px",
    marginRight: "8px",
  },

  span: {
    fontWeight: "bold",
    fontSize: "20px",
  },

  content: {
    marginTop: "80px",
    padding: "20px",
  },

  titleContainer:{
    border: "1px solid black",
    marginBottom: "70px",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },

  tableContainer: {
    overflowX: "auto",
    marginBottom: "90px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    paddingTop: "20px",
    paddingBottom: '30px'
  },

  tableTitle: {
    fontSize: "25px",
    fontWeight: "bold",
    paddingLeft: "60px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    paddingBottom: "20px",
  },

  th: {
    padding: "15px 15px", // Add padding inside header cells
    backgroundColor: "#f4f4f4", // Optional: Header background
    borderBottom: "2px solid #ddd", // Add a bottom border for headers
  },

  td: {
    padding: "15px 15px", // Add padding inside cells for spacing
    borderBottom: "1px solid #ddd", // Add a subtle border between rows
  },

  trHover: {
    "&:hover": {
      backgroundColor: "#f9f9f9", // Optional: Highlight row on hover
    },
  },

  viewAllButton: {
    marginTop: "30px",
    padding: "8px 18px",
    backgroundColor: "#1B4C7F",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "10px",
    fontWeight: 'bold',
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginLeft: "80rem"
  },

  charts: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "20px",
  },


  chart: {
    width: "45%",
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default AdminDashboard;
