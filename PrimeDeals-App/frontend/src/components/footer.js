import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import logo from '../assets/Home/logo.png';

const Footer = () => {
    return (
      <div>
        <footer style={styles.footer}>
          <div style={styles.section}>
          <img src={logo} alt="PrimeDeals Logo" style={styles.logo} />
          <span style={styles.span}>PrimeDeals</span>

            <div style={styles.socialIcons}>
              <FaInstagram style={styles.icon}/>{/* Replace with actual icons */}
              <FaTwitter style={styles.icon}/> {/* Replace with actual icons */}
              <FaFacebook style={styles.icon}/> {/* Replace with actual icons */}
            </div>
          </div>
  
          <div style={styles.section}>
            <div style={styles.heading}>Get In Touch</div>
            <div style={{color: '#CFCFCF', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <p>F-8 Street 3 Islamabad,Pakistan</p>
                <p>+92 332 5774766</p>
                <p>primedeals@gmail.com</p>
            </div>
          </div>
  
          <div style={styles.section}>
            <div style={styles.heading}>Quick Links</div>
            <a href="#about" style={styles.link}>About Us</a>
            <a href="#contact" style={styles.link}>Contact Us</a>
            <a href="#services" style={styles.link}>Services</a>
            <a href="#privacy" style={styles.link}>Privacy Policy</a>
            <a href="#terms" style={styles.link}>Terms & Conditions</a>
          </div>
  
          
         
        </footer>
  
        <div style={styles.copyright}>
          Copyright © All rights reserved
        </div>
      </div>
    );
  };

  const styles = {
    footer: {
      backgroundColor: '#1B4C7F',
      padding: '40px 20px',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
    },


    section: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },

    logo: {
    width : '40%',
    marginBottom: '10px',
    },

    span : {
      fontSize: '25px',
      fontWeight: 'bold',
      marginBottom: '15px',
    },


    socialIcons: {
      display: 'flex',
      gap: '10px',
      marginTop: '10px',
    },


    icon: {
      width: '20px',
      height: '30px',
      borderRadius: '50%',
      backgroundColor: 'transparent',
      border: '2px solid #CFCFCF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: '18px',
      cursor: 'pointer',
      padding : '5px 10px',
    },


    heading: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '15px',
    },


    link: {
      color: '#CFCFCF',
      textDecoration: 'none',
      marginBottom: '10px',
      fontSize: '16px',
    },


    newsletterInput: {
      display: 'flex',
      gap: '10px',
      marginTop: '10px',
      border: '1px solid #CFCFCF',
      padding : '20px',
    },


    input: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '14px',
      width: '200px',
    },

    
    button: {
      padding: '10px 20px',
      backgroundColor: '#1c3b72',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px',
    },


    copyright: {
      backgroundColor: '#1c3b72',
      textAlign: 'center',
      padding: '10px 0',
      color: '#fff',
      fontSize: '14px',
    },
  };

  export default Footer;