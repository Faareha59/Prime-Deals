import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import AdminHeader from "../components/adminHeader";
import axios from "axios";
import "./AdminProperties.css"; // Reusing the same CSS for consistency
import { API_BASE_URL } from "../config";

const AdminAgents = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    bio: '',
    image: ''
  });

  useEffect(() => {
    // Ensure a user object exists in localStorage
    if (!localStorage.getItem('user')) {
      const fakeUser = {
        name: 'Admin User',
        username: 'admin'
      };
      localStorage.setItem('user', JSON.stringify(fakeUser));
    }

    // Fetch agents from the API
    const fetchAgents = async () => {
      try {
        // Updated to match the correct backend endpoint
        const response = await axios.get(`${API_BASE_URL}/api/routeAgent/getAgents`);
        setAgents(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching agents:', err);
        // For demo purposes, set some dummy data if the API fails
        setAgents([
          {
            _id: '1',
            name: 'John Smith',
            email: 'john@primedeals.com',
            phoneNo: '+92 300 1234567',
            specialization: 'Residential',
            experience: '5 years',
            bio: 'Experienced real estate agent specializing in luxury homes.'
          }
        ]);
        setLoading(false);
      }
    };

    fetchAgents();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddAgent = async () => {
    try {
      const agentData = {
        name: formData.name,
        email: formData.email,
        phoneNo: formData.phone,
        nationality: 'Pakistani', // Default for now
        location: 'Pakistan', // Default for now
        language: 'English, Urdu', // Default for now
        profilePic: formData.image || 'https://via.placeholder.com/150',
        rating: 4.8, // Default rating
        specialization: formData.specialization,
        experience: formData.experience,
        bio: formData.bio
      };
      
      console.log('Sending agent data to API:', agentData);
      
      if (editingAgent) {
        // Updated to match backend API
        const updateResponse = await axios.put(`${API_BASE_URL}/api/routeAgent/${editingAgent._id}`, agentData);
        console.log('Update response:', updateResponse.data);
        alert("Agent updated successfully!");
      } else {
        // Updated to match backend API
        console.log('Calling API endpoint:', `${API_BASE_URL}/api/routeAgent/add`);
        const result = await axios.post(`${API_BASE_URL}/api/routeAgent/add`, agentData);
        console.log("Agent creation response:", result.data);
        alert("Agent added successfully!");
      }
      setShowPopup(false);
      setEditingAgent(null);
      
      // Refresh agents list
      console.log('Refreshing agent list...');
      const response = await axios.get(`${API_BASE_URL}/api/routeAgent/getAgents`);
      console.log('Agents received from API:', response.data);
      setAgents(response.data);
    } catch (error) {
      console.error("Error saving agent:", error);
      if (error.response) {
        console.error("API error response:", error.response.data);
      }
      alert(`Failed to save agent: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleEdit = (agent) => {
    setEditingAgent(agent);
    setFormData({
      name: agent.name || '',
      email: agent.email || '',
      phone: agent.phoneNo || '',
      specialization: agent.specialization || '',
      experience: agent.experience || '',
      bio: agent.bio || '',
      image: agent.profilePic || ''
    });
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (!id) {
      alert("Error: Agent ID is missing");
      return;
    }

    // Ask for confirmation before deleting
    if (window.confirm("Are you sure you want to delete this agent?")) {
      try {
        // Use correct API endpoint for deletion
        await axios.delete(`${API_BASE_URL}/api/routeAgent/${id}`);
        alert("Agent deleted successfully!");
        // Update state instead of reloading the page
        setAgents(agents.filter(agent => agent._id !== id));
      } catch (error) {
        console.error("Error deleting agent:", error);
        alert(`Failed to delete agent: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  if (loading) {
    return <div className="admin-dashboard loading">Loading...</div>;
  }

  return (
    <div className="admin-properties">
      <AdminHeader />
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '20px 0',
        padding: '0 10px'
      }}>
        <h1 style={{
          color: '#1B4C7F',
          fontSize: '28px',
          fontWeight: '600',
          margin: '0'
        }}>Agent Management</h1>
        <button 
          style={{
            backgroundColor: '#1B4C7F',
            color: 'white',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer'
          }}
          onClick={() => { 
            setFormData({
              name: '',
              email: '',
              phone: '',
              specialization: '',
              experience: '',
              bio: '',
              image: ''
            });
            setShowPopup(true); 
            setEditingAgent(null); 
          }}
        >
          <FaUserPlus /> Add Agent
        </button>
      </div>

      <div className="table-section">
        <div className="table-header">
          <h3 className="table-title">Real Estate Agents</h3>
        </div>
        
        <table className="data-table">
          <thead>
            <tr>
              <th width="5%">#</th>
              <th width="15%">Name</th>
              <th width="20%">Email</th>
              <th width="15%">Phone</th>
              <th width="15%">Specialization</th>
              <th width="15%">Experience</th>
              <th width="15%">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.length === 0 ? (
              <tr>
                <td colSpan="7" style={{textAlign: 'center', padding: '30px'}}>No agents found. Add your first agent!</td>
              </tr>
            ) : (
              agents.map((agent, index) => (
                <tr key={agent._id}>
                  <td>{index + 1}</td>
                  <td>{agent.name || '-'}</td>
                  <td>{agent.email || '-'}</td>
                  <td>{agent.phoneNo || '-'}</td>
                  <td>{agent.specialization || '-'}</td>
                  <td>{agent.experience || '-'}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-button" onClick={() => handleEdit(agent)} title="Edit Agent">
                        <FaEdit size={18} />
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(agent._id)} title="Delete Agent">
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{editingAgent ? 'Edit Agent' : 'Add New Agent'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddAgent(); }}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  id="name"
                  name="name" 
                  value={formData.name || ''} 
                  onChange={handleChange} 
                  placeholder="Full Name" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  id="email"
                  name="email" 
                  type="email"
                  value={formData.email || ''} 
                  onChange={handleChange} 
                  placeholder="Email Address" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input 
                  id="phone"
                  name="phone" 
                  value={formData.phone || ''} 
                  onChange={handleChange} 
                  placeholder="Phone Number" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="specialization">Specialization</label>
                <select 
                  id="specialization"
                  name="specialization" 
                  value={formData.specialization || ''} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select Specialization</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Land">Land</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="experience">Experience</label>
                <input 
                  id="experience"
                  name="experience" 
                  value={formData.experience || ''} 
                  onChange={handleChange} 
                  placeholder="Years of Experience" 
                  required 
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="image">Profile Image URL</label>
                <input 
                  id="image"
                  name="image" 
                  value={formData.image || ''} 
                  onChange={handleChange} 
                  placeholder="https://example.com/image.jpg" 
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="bio">Bio</label>
                <textarea 
                  id="bio"
                  name="bio" 
                  value={formData.bio || ''} 
                  onChange={handleChange} 
                  placeholder="Agent biography and professional details" 
                  required 
                />
              </div>
              
              <div className="popup-buttons">
                <button type="submit">{editingAgent ? 'Update Agent' : 'Add Agent'}</button>
                <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAgents; 