import React, { useState } from 'react';
import axios from 'axios';  // Import axios
import backgroundImage from '../assets/Agent/4.jpg'; 
import userImg from '../assets/Agent/3.png'; 
import { Link } from 'react-router-dom'; 

function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!name || !username || !password) {
    setError('All fields are required');
    return;
  }

  try {
    const response = await axios.post('http://localhost:3001/api/auth/Signup', { name, username, password });
    console.log(response.data);
    setName('');
    setUsername('');
    setPassword('');
    setError('')
    alert('User created successfully!')


  } catch (error) {
    console.error('Axios error:', error);
    if (error.response) {
      // This means the request was sent, but the backend returned an error
      console.error('Response error:', error.response.data);
      setError(error.response.data.error || 'There was an error, please try again');
    } else if (error.request) {
      // This means the request was made, but no response was received
      console.error('Request error:', error.request);
      setError('No response from server. Please check the server.');
    } else {
      // Something else went wrong
      console.error('General error:', error.message);
      setError('There was an error, please try again.');
    }
  }
  
}

  
  const styles = {
    background: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      backgroundColor: 'rgba(0, 77, 153, 0.85)',
      padding: '40px 30px',
      borderRadius: '8px',
      width: '300px',
      textAlign: 'center',
      color: 'white',
    },
    avatar: {
      backgroundColor: '#ffffff',
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      margin: '0 auto 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    inputGroup: {
      marginBottom: '20px',
      textAlign: 'left',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      color: 'white',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: 'none',
      borderBottom: '1px solid white',
      backgroundColor: 'transparent',
      color: 'white',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#003366',
      border: 'none',
      color: 'white',
      fontSize: '16px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '20px',
    },
    signupText: {
      fontSize: '14px',
      color: 'white',
      marginTop: '10px',
    },
    signupLink: {
      color: '#add8e6',
      textDecoration: 'none',
    },
    error: {
      color: 'red',
      fontSize: '12px',
      marginTop: '10px',
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <div style={styles.avatar}>
          <img
            src={userImg} 
            alt="avatar"
            style={styles.icon}
          />
        </div>
        <h2 style={styles.title}>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Enter your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Create username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Create password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.button}>Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
