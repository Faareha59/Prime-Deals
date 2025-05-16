# PrimeDeals - Real Estate Marketplace

PrimeDeals is a real estate marketplace web application. The platform allows users to browse property listings, schedule appointments, contact agents, and manage property information.

## 🏠 Features

- **Property Listings**: Browse through available properties with detailed information
- **Buy/Rent Options**: Choose to buy or rent properties based on your needs
- **Agent Directory**: Connect with professional real estate agents
- **Appointment Scheduling**: Book appointments to view properties
- **Admin Dashboard**: Manage properties, agents, and appointments
- **User Authentication**: Secure login and signup functionality
- **Contact Form**: Get in touch with the PrimeDeals team

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API requests
- Material UI for styling

### Backend
- Node.js
- Express.js
- MongoDB for the database

## Important Files

- [AboutUs.js](src/screens/AboutUs.js) - The About Us page component

## Complete Code Access

All code files have been copied to the main repository for easy access and review:

- [Frontend Files](PrimeDeals-App/frontend/) - All frontend code including React components, assets, and configuration
- [Backend Files](PrimeDeals-App/backend/) - All backend code including Express routes, models, and server configuration

## Key Frontend Files

- [Home.js](PrimeDeals-App/frontend/src/screens/Home.js) - Home page component
- [AboutUs.js](PrimeDeals-App/frontend/src/screens/AboutUs.js) - About Us page component
- [ContactUs.js](PrimeDeals-App/frontend/src/screens/ContactUs.js) - Contact Us page component
- [Listings.js](PrimeDeals-App/frontend/src/screens/Listings.js) - Property listings page
- [Login.js](PrimeDeals-App/frontend/src/screens/Login.js) - User login page
- [Signup.js](PrimeDeals-App/frontend/src/screens/Signup.js) - User registration page

## Key Backend Files

- [server.js](PrimeDeals-App/backend/server.js) - Main Express server setup
- [auth.js](PrimeDeals-App/backend/routes/auth.js) - Authentication routes
- [listings.js](PrimeDeals-App/backend/routes/listings.js) - Property listing routes
- [Properties.js](PrimeDeals-App/backend/models/Properties.js) - Property database model

## Getting Started

1. Clone the repository
2. Install dependencies for both frontend and backend
3. Set up MongoDB
4. Start the backend server
5. Start the frontend development server

```bash
# Backend setup
cd PrimeDeals-App/backend
npm install
npm start

# Frontend setup
cd PrimeDeals-App/frontend
npm install
npm start
```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3002

## 🗄️ Database Structure

The application uses MongoDB with the following collections:
- `agents`: Real estate agent profiles
- `listings`: Property listings
- `appointments`: User appointment bookings
- `contactdatas`: User contact form submissions
- `properties`: Detailed property information

## 📱 Application Structure

### Frontend
```
frontend/
├── public/
├── src/
│   ├── assets/         # Images and static files
│   ├── components/     # Reusable UI components
│   ├── screens/        # Page components
│   ├── App.js          # Main component
│   └── index.js        # Entry point
```

### Backend
```
Backend/
├── models/             # Database models
├── routes/             # API routes
├── server.js           # Main server file
``` 