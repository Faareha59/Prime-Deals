# PrimeDeals - Real Estate Marketplace


PrimeDeals is a  real estate marketplace web application. The platform allows users to browse property listings, schedule appointments, contact agents, and manage property information.

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
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB for the database


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
   └── index.js        # Entry point
```

### Backend
```
Backend/
├── models/             # Database models
├── routes/             # API routes
├── server.js           # Main server file

```




