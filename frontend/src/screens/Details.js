import React, { useState, useEffect } from "react";
import Header_2 from "../components/header-2";
import Footer from "../components/footer";
import feature2 from "../assets/Details/map.png";
import { useParams } from "react-router-dom"; // For accessing URL parameters
import axios from "axios";

function Details() {

    const { id } = useParams(); // Get the property ID from the URL
    const [property, setProperty] = useState(null);
  

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",

        date: "",
        time: "",
    });
    
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    
      
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form refresh
        try {
          const response = await axios.post("http://localhost:3001/Appointments/Book", formData);
        //   alert("Appointment booked successfully!");
          console.log("Response:", response.data);
          // Reset the form
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            date: "",
            time: "",
          });
        } catch (error) {
          console.error("Error booking appointment:", error);
          alert("Failed to book appointment. Please try again.");
        }
      };


      useEffect(() => {
        const fetchPropertyDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/api/listings/${id}`);
            setProperty(response.data); // Set the property data
          } catch (error) {
            console.error("Error fetching property details:", error);
            alert("Failed to fetch property details. Please try again.");
          }
        };
    
        fetchPropertyDetails();
      }, [id]); // Run this effect when the component mounts or the ID changes
    
      // If the property is still loading, show a loading indicator
      if (!property) {
        return <div>Loading...</div>;
      }

      
  return (
    <>
      <Header_2 />

      <main style={styles.main}>
        <h2 style={styles.title}>Property Details</h2>
            <div style={styles.propertyContainer}>
            <img
                src={property.image} // Show the image from the property data
                alt={property.location}
                style={styles.propertyImage}
            />
            <div style={styles.propertyInfo}>
                <h3 style={styles.propertyTitle}>{property.location}</h3>
                <p style={styles.propertySpecs}>
                {property.beds} beds 🛏 &nbsp; {property.baths} baths 🛁
                </p>
                <p style={styles.priceTitle}>Price:</p>
                <p style={styles.price}>In numbers: {property.priceBuy}</p>
                <p style={styles.price}>In Words: {property.priceBuyWords}</p>
            </div>
            </div>

            <div style={styles.description}>
            <p>{property.description}</p>
            <ul style={styles.featuresList}>
                {property.features.map((feature, index) => (
                <li key={index}>{feature}</li>
                ))}
            </ul>
            </div>

        <div style={styles.FormContainer}>

        <h2 style={styles.heading}>To book an appointment fill out the form below</h2>

        <form onSubmit={handleSubmit} style={styles.form}>


            {/* First Name group */}
            <div style={styles.formGroup}>
            <label style={styles.label}>First Name:</label>
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter here"
                required
                style={styles.input}
            />
            </div>


             {/* Last Name group */}
            <div style={styles.formGroup}>
            <label style={styles.label}>Last Name:</label>
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter here"
                required
                style={styles.input}
            />
            </div>


            <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter here"
                required
                style={styles.input}
            />
            </div>

            <div style={styles.formGroup}>
            <label style={styles.label}>Select Date:</label>
            <div>
                <label style={styles.radioLabel}>
                <input
                    type="radio"
                    name="date"
                    value="3 Dec, 2014"
                    onChange={handleChange}
                    required
                    style={styles.radio}
                />
                3 Dec, 2014
                </label>
                <label style={styles.radioLabel}>
                <input
                    type="radio"
                    name="date"
                    value="6 Dec, 2014"
                    onChange={handleChange}
                    required
                    style={styles.radio}
                />
                6 Dec, 2014
                </label>
                <label style={styles.radioLabel}>
                <input
                    type="radio"
                    name="date"
                    value="10 Dec, 2014"
                    onChange={handleChange}
                    required
                    style={styles.radio}
                />
                10 Dec, 2014
                </label>
            </div>
            </div>
            <div style={styles.formGroup}>
            <label style={styles.label}>Select Time:</label>
            <div>
                <label style={styles.radioLabel}>
                <input
                    type="radio"
                    name="time"
                    value="11 AM - 1 AM"
                    onChange={handleChange}
                    required
                    style={styles.radio}
                />
                11 AM - 1 AM
                </label>
                <label style={styles.radioLabel}>
                <input
                    type="radio"
                    name="time"
                    value="4 PM - 6 PM"
                    onChange={handleChange}
                    required
                    style={styles.radio}
                />
                4 PM - 6 PM
                </label>
                <label style={styles.radioLabel}>
                <input
                    type="radio"
                    name="time"
                    value="3 PM - 5 PM"
                    onChange={handleChange}
                    required
                    style={styles.radio}
                />
                3 PM - 5 PM
                </label>
            </div>
            </div>
            <button type="submit" style={styles.button}>
            Book Appointment
            </button>
        </form>
        </div>
      </main>

      <Footer />
    </>
  );
}

const styles = {
  page: {
    fontFamily: "'Arial', sans-serif",
    color: "#333",
    backgroundColor: "#f8f8f8",
    textAlign: "center",
  },

  main: {
    fontFamily: "'Arial', sans-serif",
    padding: "20px 5%",
    backgroundColor: "white",
  },

  title: {
    fontSize: "2em",
    fontWeight: "bold",
    margin: "20px 0",
  },

  propertyContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: "20px",
    margin: "50px auto",
    maxWidth: "800px",
    textAlign: "left",
  },

  propertyImage: {
    flex: "1 1 40%",
    maxWidth: "100%",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },

  propertyInfo: {
    flex: "1 1 50%",
  },

  propertyTitle: {
    fontSize: "1.8em",
    fontWeight: "bold",
  },

  propertySpecs: {
    fontSize: "1em",
    margin: "10px 0",
  },

  priceTitle: {
    fontSize: "1em",
    fontWeight: "bold",
    marginTop: "10px",
  },

  price: {
    fontSize: "1em",
    marginTop: "5px",
  },

  description: {
    backgroundColor: "#f2f2f2",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "8px",
    textAlign: "left",
    maxWidth: "800px",
    margin: "20px auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },

  featuresList: {
    listStyleType: "disc",
    paddingLeft: "20px",
    marginTop: "10px",
    lineHeight: "1.6",
  },

  FormContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },

  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },

  form: {
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
  },

  formGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },

  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
  },

  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  radioLabel: {
    marginRight: "15px",
    fontSize: "14px",
  },

  radio: {
    marginRight: "5px",
  },

  button: {
    padding: "10px 20px",
    background: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Details;