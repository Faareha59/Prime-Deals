import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import './AdminProperties.css'; 
import AdminHeader from '../components/adminHeader';
import { FaEdit, FaTrash, FaPlus, FaBed, FaBath, FaHome, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import { API_BASE_URL } from '../config';

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    image: '',
    priceRent: '',
    priceBuy: '',
    priceBuyWords: '',
    priceRentWords: '',
    location: '',
    beds: '',
    baths: '',
    propertyType: '',
    features: []
  });

  // Fetch properties from DB
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/listings`);
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
        alert("Failed to load properties. Please try again.");
      }
    };
    fetchProperties();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'features') {
      // Convert comma-separated string to array
      setFormData({ ...formData, [name]: value.split(',').map(item => item.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddProperty = async () => {
    try {
      if (editingProperty) {
        await axios.put(`${API_BASE_URL}/api/listings/${editingProperty._id}`, formData);
        alert("Property updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/api/listings`, formData);
        alert("Property added successfully!");
      }
      setShowPopup(false);
      setEditingProperty(null);
      
      // Refresh properties list
      const response = await axios.get(`${API_BASE_URL}/api/listings`);
      setProperties(response.data);
    } catch (error) {
      console.error("Error saving property:", error);
      alert(`Failed to save property: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleEdit = (property) => {
    // Convert features to comma-separated string if it's an array
    const propertyToEdit = {
      ...property,
      features: Array.isArray(property.features) ? property.features : []
    };
    setEditingProperty(propertyToEdit);
    setFormData(propertyToEdit);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (!id) {
      alert("Error: Property ID is missing");
      return;
    }

    // Ask for confirmation before deleting
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/api/listings/${id}`);
        if (response.status === 200) {
          alert("Property deleted successfully!");
          // Update state instead of reloading the page
          setProperties(properties.filter(property => property._id !== id));
        } 
      } catch (error) {
        console.error("Error deleting property:", error);
        alert(`Failed to delete property: ${error.response?.data?.message || error.message}`);
      }
    }
  };

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
        }}>Property Management</h1>
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
              description: '',
              image: '',
              priceRent: '',
              priceBuy: '',
              priceBuyWords: '',
              priceRentWords: '',
              location: '',
              beds: '',
              baths: '',
              propertyType: '',
              features: []
            });
            setShowPopup(true); 
            setEditingProperty(null); 
          }}
        >
          <FaPlus /> Add Property
        </button>
      </div>

      <div className="properties-table-container">
        <table className="properties-table">
          <thead>
            <tr>
              <th width="5%">#</th>
              <th width="10%">Type</th>
              <th width="15%">Location</th>
              <th width="10%">Buy Price</th>
              <th width="10%">Rent Price</th>
              <th width="5%">Beds</th>
              <th width="5%">Baths</th>
              <th width="20%">Description</th>
              <th width="10%">Features</th>
              <th width="10%">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td colSpan="10" style={{textAlign: 'center', padding: '30px'}}>No properties found. Add your first property!</td>
              </tr>
            ) : (
              properties.map((property, index) => (
                <tr key={property._id}>
                  <td>{index + 1}</td>
                  <td>{property.propertyType || '-'}</td>
                  <td>{property.location || '-'}</td>
                  <td>{property.priceBuy || '-'}</td>
                  <td>{property.priceRent || '-'}</td>
                  <td>{property.beds || '-'}</td>
                  <td>{property.baths || '-'}</td>
                  <td className="description-cell">{property.description || '-'}</td>
                  <td className="features-cell">
                    {Array.isArray(property.features) && property.features.length > 0
                      ? property.features.join(', ')
                      : '-'}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-button" onClick={() => handleEdit(property)} title="Edit Property">
                        <FaEdit size={18} />
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(property._id)} title="Delete Property">
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
            <h2>{editingProperty ? 'Edit Property' : 'Add New Property'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddProperty(); }}>
              <div className="form-group">
                <label htmlFor="propertyType">Property Type</label>
                <select 
                  id="propertyType"
                  name="propertyType" 
                  value={formData.propertyType || ''} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select Type</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Condo">Condo</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input 
                  id="location"
                  name="location" 
                  value={formData.location || ''} 
                  onChange={handleChange} 
                  placeholder="e.g. F6, Islamabad" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="priceBuy">Buy Price</label>
                <input 
                  id="priceBuy"
                  name="priceBuy" 
                  value={formData.priceBuy || ''} 
                  onChange={handleChange} 
                  placeholder="e.g. PKR 2.5 Crore" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="priceBuyWords">Buy Price in Words</label>
                <input 
                  id="priceBuyWords"
                  name="priceBuyWords" 
                  value={formData.priceBuyWords || ''} 
                  onChange={handleChange} 
                  placeholder="e.g. Two Crore Fifty Lakh" 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="priceRent">Rent Price</label>
                <input 
                  id="priceRent"
                  name="priceRent" 
                  value={formData.priceRent || ''} 
                  onChange={handleChange} 
                  placeholder="e.g. PKR 80,000/month" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="priceRentWords">Rent Price in Words</label>
                <input 
                  id="priceRentWords"
                  name="priceRentWords" 
                  value={formData.priceRentWords || ''} 
                  onChange={handleChange} 
                  placeholder="e.g. Eighty Thousand" 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="beds">Bedrooms</label>
                <input 
                  id="beds"
                  name="beds" 
                  type="number" 
                  value={formData.beds || ''} 
                  onChange={handleChange} 
                  placeholder="e.g. 3" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="baths">Bathrooms</label>
                <input 
                  id="baths"
                  name="baths" 
                  type="number" 
                  value={formData.baths || ''} 
                  onChange={handleChange} 
                  placeholder="e.g. 2" 
                  required 
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="image">Image URL</label>
                <input 
                  id="image"
                  name="image" 
                  value={formData.image || ''} 
                  onChange={handleChange} 
                  placeholder="https://example.com/image.jpg" 
                  required 
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="description">Description</label>
                <textarea 
                  id="description"
                  name="description" 
                  value={formData.description || ''} 
                  onChange={handleChange} 
                  placeholder="Detailed property description" 
                  required 
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="features">Features (comma separated)</label>
                <textarea 
                  id="features"
                  name="features" 
                  value={Array.isArray(formData.features) ? formData.features.join(', ') : ''} 
                  onChange={handleChange} 
                  placeholder="e.g. Swimming Pool, Garden, Parking, Security" 
                  required 
                />
              </div>
              
              <div className="popup-buttons">
                <button type="submit">{editingProperty ? 'Update Property' : 'Add Property'}</button>
                <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProperties;
