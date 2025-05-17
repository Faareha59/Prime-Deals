import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../assets/listings/logo.png'; // Adjust the path to your logo file
import logo1 from '../assets/listings/logo1.jpeg'; // Adjust the path to your bed icon
import logo2 from '../assets/listings/logo2.jpeg'; // Adjust the path to your bath icon
 // Adjust the path to your logo file

function Listings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  const handleRentBuyClick = (listingId) => {
    navigate(`/details/${listingId}`);
  };

  // Fetch the listings data from the backend on mount
  useEffect(() => {
    axios.get('http://localhost:3001/api/listings')
      .then((response) => setListings(response.data))
      .catch((error) => console.error('Error fetching listings:', error));
  }, []);

  return (
    <div className="listings-container">
           <style>
{`
.listings-container {
font-family: Arial, sans-serif;
background-color: #f4f4f9;
width: 100%;
padding: 0;
margin: 0;
}
.button {
width:90px;
height:25px;
padding: 0px 10px;
margin-top: 10px;
border: none;
border-radius: 5px;
cursor: pointer;
font-weight: bold;
transition: background-color 0.3s;
}
.buy-button {
background-color: #2c8f9d;
color: white;
width:90px;
}
.buy-button:hover {
background-color: #237c7a;
}
.rent-button {
background-color: #2c8f9d;
color: white;
width:90px;

}
.rent-button:hover {
background-color: #e68a00;
}
.listings-wrapper {
width: 100%;
max-width: 1200px;
margin: 0 auto;
padding: 20px;
box-sizing: border-box;
}
.filter-section {
padding: 20px;
background-color: #e0f7fa;
border-radius: 10px;
margin-bottom: 30px;
width: 100%;
}
.button1{
background-color: #FA5F55;
color: white;
width:6rem;
height: 25px;
font-size: 10px;
margin-top: 10px;
border: none;
margin-left:200px;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s;
}
.filter-section label {
font-weight: bold;
color: #2c8f9d;
margin-right: 10px;
}
.filter-section select {
padding: 10px;
margin: 10px 0;
border: 1px solid #2c8f9d;
border-radius: 5px;
background-color: white;
}
.listings-content {
background-color: #ffffff;
border-radius: 10px;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
padding: 30px;
margin-bottom: 30px;
}
.navbar {
background-color: #1B4C7F;
display: flex;
justify-content: space-between;
align-items: center;
padding: 1rem 2rem;
color: #fff;
}

.logo {
font-size: 1.5rem;
font-weight: bold;
}
.add-to-fav{
background-color: #2c8f9d;
color: white;
width:90px;

}

.logoContainer {
display: flex;
align-items: center;
}

.logoImage {
width: 40px;
height: 40px;
margin-right: 10px;
}
.add-to-fav{
background-color: #2c8f9d;
color: white;

height:20px;
}

.navLinksContainer {
display: flex;
gap: 15px;
}

.navLink {
color: white;
text-decoration: none;
font-size: 1rem;
margin: 0 12px;
}

.listings-title {
background-color: #1B4C7F;;
color: white;
padding: 20px;
text-align: center;
font-size: 2rem;
font-weight: bold;
border-radius: 10px;
margin-bottom: 30px;
}
.listing-container {
display: flex;
flex-wrap: wrap;
justify-content: space-between;
}
.listing-item {
display: flex;
background-color: #ffffff;
border: 1px solid #e0e0e0;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
padding: 20px;
border-radius: 10px;
transition: transform 0.2s;
margin-bottom: 20px;
width: calc(50% - 10px);
box-sizing: border-box;
}
.listing-item:hover {
transform: scale(1.02);
}
.listing-image {
width: 250px;
height: 180px;
border-radius: 10px;
margin-right: 20px;
}
.listing-details {
flex: 1;
display: flex;
flex-direction: column;
justify-content: space-between;
}
.listing-location {
font-weight: bold;
font-size: 1.2rem;
margin: 5px 0;
}
.listing-price {
font-weight: bold;
font-size: 1rem;
color: black;
margin: 5px 0;
}
.listing-rent {
font-weight: bold;
font-size: 1rem;
margin: 5px 0;
color: black;
}
.listing-amenities {
display: flex;
align-items: center;
margin-top: auto;
}
.listing-amenity {
display: flex;
align-items: center;
margin-right: 15px;
}
.footer {
marginTop: "20px",
}
.info{
margin-top: 3%;
display: flex;
flex-direction: row;
gap:40px;
}
.listing-amenity img {
width: 20px; /* Set icon width */
height: 20px; /* Set icon height */
margin-right: 5px;
}
`}
</style>

      {/* <header className="navbar">
        <div className="logoContainer">
          <img src={logo} alt="PrimeDeals Logo" className="logoImage" />
          <div className="logo">PrimeDeals</div>
        </div>

        <nav className="navLinksContainer">
          <a href="#home" className="navLink">Home</a>
          <a href="#properties" className="navLink">Properties</a>
          <a href="#listings" className="navLink">Listings</a>
          <a href="#favorites" className="navLink">Favorites</a>
          <a href="#contact" className="navLink">Contact Us</a>
          <a href="#about" className="navLink">About Us</a>
        </nav>
      </header> */}

    <header className="navbar">
        <div className="logoContainer">
            <img src={logo} alt="PrimeDeals Logo" className="logoImage" />
            <div className="logo">PrimeDeals</div>
        </div>

        <nav className="navLinksContainer">
            <Link to="/listings" className="navLink">Listings</Link> {/* Changed a to Link */}
        </nav>
    </header>

      <h2>Listings</h2>
      <div className="listing-container">
        {listings.map((listing, index) => (
          <div key={index} className="listing-item">
            <img src={listing.image} alt={listing.location} className="listing-image" />
            <div className="listing-details">
              <p className="listing-location">{listing.location}</p>
              <p className="listing-priceBuy">{listing.priceBuy}</p>
              <button className="buy-button" onClick={() => handleRentBuyClick(listing._id)}>Buy</button>
              <p className="listing-priceRent">{listing.priceRent}</p>
              <button className="rent-button" onClick={() => handleRentBuyClick(listing._id)}>Rent</button>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Listings;
