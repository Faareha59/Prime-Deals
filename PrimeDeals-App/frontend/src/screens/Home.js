import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import hero from '../assets/Home/Hero.png';
import Header from '../components/header';
import Footer from '../components/footer';
import feature1 from '../assets/Home/feature-1.png';
import feature2 from '../assets/Home/feature-2.png';
import feature3 from '../assets/Home/feature-3.png';
import feature4 from '../assets/Home/feature-4.png';
import handshake from '../assets/Home/handshake.png';
import handHouse from '../assets/Home/hand-house.png';
import house from '../assets/Home/house.png';
import apartment from '../assets/Home/apartment.png';
import client1 from '../assets/Home/Client-pic-1.png';
import client2 from '../assets/Home/Client-pic-2.png';

const Home = () => {
  // Force animation to replay when component mounts
  useEffect(() => {
    // This forces a DOM reflow which helps ensure animations run properly
    const elements = document.querySelectorAll('.hero-title-animated, .hero-subtitle-animated, .hero-description-animated');
    elements.forEach(el => {
      el.style.animation = 'none';
      void el.offsetHeight; // Trigger reflow with void operator to fix linter error
      el.style.animation = null;
    });
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section with Left-to-Right Animation */}
      <div 
        className="hero-banner"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }}></div>
        
        <div className="hero-content-animated">
          <h1 className="hero-title-animated">
            WELCOME TO PRIME DEALS
          </h1>
          <p className="hero-subtitle-animated">
            Find Your Dream Space – Buy or Rent, Seamlessly!
          </p>
          <p className="hero-description-animated">
            From renting to owning, we bring you closer to the place you'll love to call home.
          </p>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="container py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">Featured Properties</h2>
        
        <div className="flex flex-wrap justify-center gap-8">
          <div className="property-card hover-scale">
            <img src={feature1} alt="Modern Villa" className="property-image" />
            <div className="property-details">
              <h3 className="property-title">Modern Villa</h3>
              <p className="text-gray-600">F6, Islamabad</p>
            </div>
          </div>

          <div className="property-card hover-scale">
            <img src={feature2} alt="Family House" className="property-image" />
            <div className="property-details">
              <h3 className="property-title">Family House</h3>
              <p className="text-gray-600">G10, Islamabad</p>
            </div>
          </div>

          <div className="property-card hover-scale">
            <img src={feature3} alt="Apartment" className="property-image" />
            <div className="property-details">
              <h3 className="property-title">Luxury Apartment</h3>
              <p className="text-gray-600">Gulberg Greens, Islamabad</p>
            </div>
          </div>

          <div className="property-card hover-scale">
            <img src={feature4} alt="Bahria Apartment" className="property-image" />
            <div className="property-details">
              <h3 className="property-title">Bahria Apartment</h3>
              <p className="text-gray-600">Bahria Town, Sector-4</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section - Improved Design */}
      <div style={{ padding: '30px 0', backgroundColor: '#f0f4f8', borderTop: '1px solid #e0e7ff', borderBottom: '1px solid #e0e7ff' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            textAlign: 'center', 
            margin: '0 30px', 
            background: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)', 
            width: '180px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
          }}
          >
            <div style={{ 
              backgroundColor: '#e6f0ff', 
              borderRadius: '50%', 
              width: '80px', 
              height: '80px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 15px' 
            }}>
              <img src={handshake} alt="Buy With Ease" style={{ height: '50px' }} />
            </div>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1B4C7F' }}>BUY WITH EASE</p>
          </div>
          
          <div style={{ 
            textAlign: 'center', 
            margin: '0 30px', 
            background: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)', 
            width: '180px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
          }}
          >
            <div style={{ 
              backgroundColor: '#e6f7ff', 
              borderRadius: '50%', 
              width: '80px', 
              height: '80px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 15px' 
            }}>
              <img src={handHouse} alt="Easy Rentals" style={{ height: '50px' }} />
            </div>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1B4C7F' }}>EASY RENTALS</p>
          </div>
        </div>
      </div>

      {/* Property Types - Improved Design */}
      <div style={{ padding: '30px 0' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '25px', color: '#1B4C7F' }}>Property Types</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)', 
            margin: '0 20px', 
            width: '180px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            border: '1px solid #eaeaea'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          >
            <div style={{ backgroundColor: '#f0f4f8', padding: '20px', display: 'flex', justifyContent: 'center' }}>
              <img src={house} alt="House" style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
            </div>
            <div style={{ padding: '15px', textAlign: 'center', borderTop: '1px solid #eaeaea' }}>
              <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>House</p>
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)', 
            margin: '0 20px', 
            width: '180px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            border: '1px solid #eaeaea'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          >
            <div style={{ backgroundColor: '#f0f4f8', padding: '20px', display: 'flex', justifyContent: 'center' }}>
              <img src={apartment} alt="Apartment" style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
            </div>
            <div style={{ padding: '15px', textAlign: 'center', borderTop: '1px solid #eaeaea' }}>
              <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Apartment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Client Reviews - Horizontal Layout */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px 0' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: '#1B4C7F' }}>Client Reviews</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '15px', textAlign: 'center', margin: '0 15px', maxWidth: '300px' }}>
            <img src={client1} alt="Bilal Abbas" style={{ width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 10px' }} />
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Bilal Abbas</p>
            <p style={{ color: '#6c757d', marginBottom: '10px' }}>Rawalpindi, PK</p>
            <div style={{ color: '#FFD700', marginBottom: '10px' }}>
              <FaStar style={{ display: 'inline' }} />
              <FaStar style={{ display: 'inline' }} />
              <FaStar style={{ display: 'inline' }} />
              <FaStar style={{ display: 'inline' }} />
              <FaStar style={{ display: 'inline' }} />
            </div>
            <p style={{ color: '#6c757d', fontSize: '14px' }}>
              "Prime Deals made the process of finding my dream home so easy and stress-free."
            </p>
          </div>
          
          <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '15px', textAlign: 'center', margin: '0 15px', maxWidth: '300px' }}>
            <img src={client2} alt="Amna Noor" style={{ width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 10px' }} />
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Amna Noor</p>
            <p style={{ color: '#6c757d', marginBottom: '10px' }}>Islamabad, PK</p>
            <div style={{ color: '#FFD700', marginBottom: '10px' }}>
              <FaStar style={{ display: 'inline' }} />
              <FaStar style={{ display: 'inline' }} />
              <FaStar style={{ display: 'inline' }} />
              <FaStar style={{ display: 'inline' }} />
              <FaStar style={{ display: 'inline' }} />
            </div>
            <p style={{ color: '#6c757d', fontSize: '14px' }}>
              "I was able to find the perfect rental property within days. Thank you, Prime Deals!"
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
