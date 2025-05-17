import React, { useState } from 'react';
import backgroundImage from '../assets/Agent/2.jpg'; 
import userImg from '../assets/Agent/3.png'; 
import axios from 'axios';  // Import axios
import { Link, useNavigate } from 'react-router-dom'; 



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { username, password };
  
    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/Login',
        userData,
        {
          timeout: 10000,
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          },
        }
      );

      if (response.data.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        
        setUsername('');
        setPassword('');
        setError('');
        
        // Show success message
        alert('Login successful!');
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login Error:', err);
      if (err.response) {
        setError(err.response.data.message || 'Login failed. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };
  
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
        <h2 style={styles.title}>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.signupText}>
          Don't have an account?{' '}
          <Link to="/" style={styles.signupLink}>Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
