import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/adminHeader";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import "./AdminDashboard.css";
import { API_BASE_URL } from "../config";

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in - TEMPORARILY DISABLED
    /*
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/signIn');
      return;
    }
    */
    
    // Ensure a user object exists in localStorage
    if (!localStorage.getItem('user')) {
      const fakeUser = {
        name: 'Admin User',
        username: 'admin'
      };
      localStorage.setItem('user', JSON.stringify(fakeUser));
    }

    // Fetch properties
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/listings`);
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

  if (loading) {
    return <div className="admin-dashboard loading">Loading...</div>;
  }

  if (error) {
    return <div className="admin-dashboard error">Error: {error}</div>;
  }

  return (
    <div className="admin-dashboard">
      {/* Navbar */}
      <AdminHeader />

      {/* Main Content */}
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Admin Dashboard</h1>
        </div>

        {/* Simple Welcome Section */}
        <div className="welcome-section">
          <h2>Welcome to PrimeDeals Admin</h2>
          <p>Manage your properties and monitor your real estate listings from this dashboard.</p>
          <p>Currently managing <strong>{properties.length}</strong> properties.</p>
        </div>

        {/* Properties Table */}
        <div className="table-section">
          <div className="table-header">
            <h3 className="table-title">Recent Properties</h3>
          </div>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Location</th>
                <th>Buy Price</th>
                <th>Rent Price</th>
                <th>Beds</th>
                <th>Baths</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {properties.slice(0, 5).map((property) => (
                <tr key={property._id}>
                  <td className="id-cell">{property._id?.substring(0, 8)}...</td>
                  <td>{property.propertyType || '-'}</td>
                  <td>{property.location || '-'}</td>
                  <td>{property.priceBuy || '-'}</td>
                  <td>{property.priceRent || '-'}</td>
                  <td>{property.beds || '-'}</td>
                  <td>{property.baths || '-'}</td>
                  <td className="description-cell">{property.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="table-footer">
            <button 
              className="view-all-btn"
              onClick={() => navigate('/properties')}
            >
              <FaEye style={{ marginRight: '5px' }} /> View All Properties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
