import React, {useState} from 'react';
import ContactUs_img from '../assets/Contact/ContactUs_img.jpg'; 
import Footer from '../components/footer';
import Header from '../components/header';
import axios from 'axios';


const ContactUs = () => {

  const [formData, setFormData] = useState({
    Fullname: '',
    Email: '',
    Number: '',
    Message: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/Contacts/add', formData)
      .then((response) => {
        if (response.data.success) {
          alert('Message sent successfully!');
          setFormData({
            Fullname: '',
            Email: '',
            Number: '',
            Message: '',
          })
        } else {
          alert('Error sending message.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error connecting to server.');
      });
  };
  return (
    <div style={styles.container}>
      <Header />
      <div
        style={{
          ...styles.formSection,
          backgroundImage: `url(${ContactUs_img})`, 
        }}
      >
        <h1 style={styles.heading}>Contact Us</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>Full Name:</label>

          <input type="text" placeholder="Enter name.." name="Fullname" value={formData.Fullname} onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Email:</label>

          <input type="email" placeholder="Enter email.." name="Email" value={formData.Email} onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Phone Number:</label>

          <input type="tel" placeholder="Enter phone number.." name="Number" value={formData.Number} onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Message:</label>

          <textarea placeholder="Enter message here.." name="Message" value={formData.Message} onChange={handleChange} rows="5" style={styles.textarea}></textarea>

          <button
            type="submit"
            style={styles.formButton}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.formButton.backgroundColor)}
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    color: '#333',
  },
  formSection: {
    padding: '40px',
    backgroundSize: 'cover', // Makes the image cover the entire section
    backgroundPosition: 'center', // Centers the background image
    backgroundRepeat: 'no-repeat', // Ensures the image does not repeat
    color: '#fff', // Adjusts the text color to improve readability
  },
  heading: {
    fontSize: '2em',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    margin: '0 auto',
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'left',
    margin: '10px 0 5px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  formButton: {
    padding: '10px',
    backgroundColor: '#1B4C7F',
    color: 'white',
    fontSize: '1em',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#155a8b',
  },
};

export default ContactUs;