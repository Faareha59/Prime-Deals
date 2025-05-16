import React from 'react';
import AboutUs_img from '../assets/About/AboutUs_img.jpg';
import Footer from '../components/footer';
import Header from '../components/header';

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <Header />

      {/* About Us Section */}
      <div style={styles.aboutContainer}>
        <img
          src={AboutUs_img}
          alt="House and Keys"
          style={styles.aboutImage}
        />
        <div style={styles.aboutText}>
          <h1 style={styles.heading}>ABOUT US</h1>
          <h2 style={styles.subHeading}>Our Story</h2>
          <p style={styles.paragraph}>
          At PrimeDeals, we're more than just a real estate agency — we're your trusted partners in finding a place to call home. Since our founding, we've dedicated ourselves to helping clients navigate the real estate market with ease and confidence. Our team combines industry expertise with local knowledge, ensuring every step of your journey is supported, whether you're buying, selling, or investing.
          We understand that the process of finding the perfect property can be overwhelming, which is why we offer personalized consultations tailored to your unique needs. Our commitment to excellence means that we prioritize transparency, integrity, and open communication, keeping you informed at every turn.

          With a diverse portfolio of properties ranging from cozy starter homes to luxurious estates, we strive to match you with the ideal living space that fits your lifestyle and budget. Beyond transactions, we build lasting relationships with our clients, guiding you even after the keys are handed over.

          Let us help you make your real estate dreams a reality. Together, we can explore the possibilities and create a brighter future in the home you've always envisioned.
          </p>
        </div>
      </div>

     <Footer/>
        
     
        
    </div>
  );
};

// Styles
const styles = {
  aboutContainer: {
    display: 'flex',
    alignItems: 'flex-start', // Aligns image and text at the top
    justifyContent: 'flex-start', // Ensures content stays to the left
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto', // Center the container on the page
  },
  aboutImage: {
    width: '300px',
    height: 'auto',
    marginRight: '2rem',
    borderRadius: '8px',
  },
  aboutText: {
    textAlign: 'left', // Aligns all text to the left
    maxWidth: '600px',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#1B4C7F',
  },
  subHeading: {
    fontSize: '1.75rem',
    marginBottom: '1rem',
    color: '#333',
    marginTop: '0.5rem', // Space between heading and subheading
  },
  paragraph: {
    lineHeight: '1.6',
    fontSize: '1rem',
    color: '#333',
    marginTop: '1rem', // Add spacing after subheading
  },
};



export default AboutUs;
