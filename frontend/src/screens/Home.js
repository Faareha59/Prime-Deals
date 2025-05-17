import React from 'react';
import { FaStar } from 'react-icons/fa';
import hero from '../assets/Home/Hero.png'
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

    return(
        <>
        <Header />


        {  /* HERO SECTION */  }

        <div style= {styles.heroSection}>
            <div style={styles.overlay}></div> 
            <div style={styles.content}>
                <h1 style={styles.headerText}>WELCOME TO PRIME DEALS</h1>
                <p style={styles.subText}>Find Your Dream Space – Buy or Rent, Seamlessly!</p>
                <p style={styles.descriptionText}>
                    From renting to owning, we bring you closer to the place you’ll love to call home.
                </p>
            </div>
        </div>



        {/* FEATURED PROPERTIES */}

        <div style={styles.featuredProperties}>
            <h2 style={styles.featuredTitle}>Featured Properties</h2>

            <div style={styles.propertyList}>

                <div style={styles.propertyCard}>
                    <img src={feature1} alt="Property 1" style={styles.propertyImage} />
                    <div style={styles.propertyDetails}>
                        <h3>Modern Villa</h3>
                        <p>F6, Islamabad</p>
                        <button style={styles.viewButton}>View Details</button>
                   </div>
               </div>

                <div style={styles.propertyCard}>
                    <img src={feature2} alt="Property 2" style={styles.propertyImage} />
                    <div style={styles.propertyDetails}>
                        <h3>Family House</h3>
                        <p>G10, Islamabad</p>
                        <button style={styles.viewButton}>View Details</button>
                   </div>
               </div>

                <div style={styles.propertyCard}>
                    <img src={feature3} alt="Property 3" style={styles.propertyImage} />
                    <div style={styles.propertyDetails}>
                        <h3>Lovely Apartment</h3>
                        <p>Gulberg Greens, Islamabad</p>
                        <button style={styles.viewButton}>View Details</button>
                   </div>
               </div>

               <div style={styles.propertyCard}>
                    <img src={feature4} alt="Property 4" style={styles.propertyImage} />
                    <div style={styles.propertyDetails}>
                        <h3>Bahria Apartment</h3>
                        <p>Bahria Town, Sector N</p>
                        <button style={styles.viewButton}>View Details</button>
                   </div>
               </div>
            </div>
        </div>


        {/* Services Section */}
        <div style={styles.services}>

            <div style={styles.serviceItem}>
                <img src={handshake} alt="Service 1" style={styles.serviceIcon} />
                <p style={styles.serviceText}>BUY WITH EASE</p>
            </div>

            <div style={styles.serviceItem}>
            <img src={handHouse} alt="Service 2" style={styles.serviceIcon} />
                <p style={styles.serviceText}>EASY RENTALS</p>
            </div>
        </div>



        {/* PROPERTY TYPES */}

        <div>

            <h2 style={styles.sectionTitle}>Property Types</h2>

            <div style={styles.propertyTypesContainer}>

                <div style={styles.propertyCard}>
                    <img src={house} alt="Property Type 1" style={styles.propertyHouseIcon} />
                    <p>House</p>
                </div>

                <div style={styles.propertyCard}>
                    <img src={apartment} alt="Property Type 2" style={styles.propertyApartmentIcon} />
                    <p>Apartment</p>
                </div>
            </div>
        </div>


        {/* CLIENT REVIEWS */}

        <div>
            <h2 style={styles.sectionTitle}>Client Reviews</h2>

            <div style={styles.reviewsContainer}>

                <div style={styles.reviewCard}>
                    <img src={client1} alt="Client" style={styles.clientImage} />
                    <p style={styles.clientName}>Bilal Abbas</p>
                    <p style={styles.clientLocation}>Rawalpindi, PK</p>

                    <div style={styles.starRating}>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                    </div>
                    <p style={styles.reviewText}>
                    Incredible value for money—highly recommended!
                    </p>
                </div>

                <div style={styles.reviewCard}>
                    <img src={client2} alt="Client" style={styles.clientImage} />
                    <p style={styles.clientName}>Amna Noor</p>
                    <p style={styles.clientLocation}>Islamabad, PK</p>
                    <div style={styles.starRating}>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                    </div>
                    <p style={styles.reviewText}>
                    Stylish, durable, and exactly what I wanted!
                    </p>
                </div>

                <div style={styles.reviewCard}>
                <img src={client1} alt="Client" style={styles.clientImage} />
                    <p style={styles.clientName}>Ali Raza</p>
                    <p style={styles.clientLocation}>Lahore, PK</p>
                    <div style={styles.starRating}>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                    </div>
                    <p style={styles.reviewText}>
                    Top-notch craftsmanship and quick delivery!
                    </p>
                </div>

                <div style={styles.reviewCard}>
                <img src={client2} alt="Client" style={styles.clientImage} />
                    <p style={styles.clientName}>Sana Rauf </p>
                    <p style={styles.clientLocation}>Rawalpindi, PK</p>
                    <div style={styles.starRating}>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                    </div>
                    <p style={styles.reviewText}>
                    Absolutely love the quality and service—beyond expectations!
                    </p>
                </div>

            </div>
        </div>


        <Footer />

       </>
    );
}

const styles = {

    // HERO SECTION STYLING 
    heroSection: {
        position: 'relative',
        backgroundImage: `url(${hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '700px', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        overflow: 'hidden', 
      },

      overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        backdropFilter: 'blur(4px)', 
        zIndex: 1, 
      },

      content: {
        position: 'relative',
        zIndex: 2, 
      },


      headerText: {
        fontSize: '48px',
        marginBottom: '16px',
      },


      subText: {
        fontSize: '24px',
        marginBottom: '8px',
      },


      descriptionText: {
        fontSize: '20px',
        maxWidth: '600px',
        lineHeight: '1.5',
      },


    // FEATURED PROPERTIES

    featuredProperties: {
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },

    featuredTitle: {
        fontSize: '40px',
        fontWeight: 'bold',
        marginBottom: '45px',
        marginTop: '130px',
    },
      
    propertyList: {
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
    },

    propertyCard: {
        width: '300px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        textAlign: 'center',
        overflow: 'hidden',
    },

    propertyImage: {
        width: '100%',
        height: '200px',
    },

    propertyDetails: {
        padding: '20px',
        fontSize: '15px',
    },
    
    viewButton: {
        padding: '8px 16px',
        border: 'none',
        borderRadius: '20px',
        backgroundColor: '#f0f0f0',
        fontSize: '14px',
        cursor: 'pointer',
        marginTop: '5px',
    },



    // SERVICES SECTION

    services: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '200px',
        backgroundColor: '#f9f9f9',
        padding: '40px',
        backgroundColor: '#E7E7E7',
        marginTop: '250px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        marginBottom: '50px',
    },

    serviceItem: {
        textAlign: 'center',
    },

    serviceIcon: {
        fontSize: '45px',
        marginBottom: '10px',
        height: '250px',
    },

    serviceText: {
        fontWeight: 'bold',
        fontSize: '30px',
      },


    // PROPERTIES TYPES

    sectionTitle: {
        textAlign: 'center',
        fontSize: '40px',
        fontWeight: 'bold',
        marginBottom: '50px',
        marginTop: '200px',
      },

      propertyTypesContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '150px',
        padding: '20px',
      },


      propertyCard: {
        width: '400px',
        textAlign: 'center',
        padding: '15px',
        boxShadow: '0 5px 8px rgba(0,0,0,0.3)',
        borderRadius: '10px',
        backgroundColor: '#fff',
        fontSize: '25px',
        fontWeight: 'bold',
        alighItems: 'center',
    },

      propertyHouseIcon: {
        paddingTop: '60px',
        marginBottom: '15px',
        width: '55%',
      },

      propertyApartmentIcon: {
        // marginBottom: '5px',
        width: '70%',
      },

    
    //   CLIENT REVIEWS 

    reviewsContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '60px',
        padding: '20px',
      },

    reviewCard: {
        width: '250px',
        padding: '20px',
        boxShadow: '0 6px 8px rgba(0,0,0,0.2)',
        borderRadius: '10px',
        backgroundColor: '#fff',
        textAlign: 'center',
        overflow: 'hidden',
      },


    clientImage: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        marginBottom: '10px',
    },

    clientName: {
        fontSize: '18px',
        fontWeight: 'bold',
    },


    clientLocation: {
        color: 'gray',
        fontSize: '14px',
        marginBottom: '20px',
    },

    starRating: {
        color: '#FFD700', // Yellow color for stars
        marginBottom: '10px',
    },

    reviewText: {
        fontSize: '14px',
        color: '#555',
        overflowWrap: 'break-word', 
        maxWidth: '100%', 
    },

};

export default Home;