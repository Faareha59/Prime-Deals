import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import './AdminProperties.css'; 
import AdminHeader from '../components/adminHeader';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    image: '',
    priceRent: '',
    priceBuy: '',
    location: '',
    beds: '',
    baths: '',
    propertyType: '',
    features: ''
  });

  // Fetch properties from DB
  useEffect(() => {
    const fetchProperties = async () => {
      const response = await axios.get('http://localhost:3001/api/listings');
      setProperties(response.data);
    };
    fetchProperties();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProperty = async () => {
    if (editingProperty) {
      await axios.put(`http://localhost:3001/api/listings/${editingProperty._id}`, formData);
    } else {
      await axios.post('http://localhost:3001/api/listings', formData);
    }
    setShowPopup(false);
    setEditingProperty(null);
    window.location.reload(); // Refresh list
  };



  const handleEdit = (property) => {
    setEditingProperty(property);
    setFormData(property);
    setShowPopup(true);
  };



  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/api/listings/${id}`);
    window.location.reload(); // Refresh list
  };



  return (
    <div className="admin-properties">
        <AdminHeader />
      <h1>Properties</h1>
      <button className="add-button" onClick={() => { setShowPopup(true); setEditingProperty(null); }}>
        <i className="fas fa-plus"></i> Add Property
      </button>

      <table className="properties-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Location</th>
            <th>Buy</th>
            <th>Rent</th>
            <th>Beds</th>
            <th>Baths</th>
            <th>Description</th>
            <th>Features</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => (
            <tr key={property._id}>
              <td>{index + 1}</td>
              <td>{property.propertyType}</td>
              <td>{property.location}</td>
              <td>{property.priceBuy}</td>
              <td>{property.priceRent}</td>
              <td>{property.beds}</td>
              <td>{property.baths}</td>
              <td>{property.description}</td>
              <td>{property.features.join(', ')}</td>
              <td>
              <FaEdit
                style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }}
                onClick={() => handleEdit(property)}
                />
                <FaTrash
                style={{ cursor: 'pointer', color: 'red' }}
                onClick={() => handleDelete(property.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{editingProperty ? 'Edit Property' : 'Add Property'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddProperty(); }}>
              <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
              <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
              <input name="priceRent" value={formData.priceRent} onChange={handleChange} placeholder="Rent Price" required />
              <input name="priceBuy" value={formData.priceBuy} onChange={handleChange} placeholder="Buy Price" required />
              <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
              <input name="beds" value={formData.beds} onChange={handleChange} placeholder="Beds" required />
              <input name="baths" value={formData.baths} onChange={handleChange} placeholder="Baths" required />
              <input name="propertyType" value={formData.propertyType} onChange={handleChange} placeholder="Property Type" required />
              <input name="features" value={formData.features} onChange={handleChange} placeholder="Features (comma separated)" required />
              <div className="popup-buttons">
                <button type="submit">{editingProperty ? 'Update' : 'Add'}</button>
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