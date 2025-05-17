// Script to add admin user to MongoDB
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name';
    console.log('Connecting to MongoDB:', mongoURI);
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connection successful');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    return false;
  }
}

// Add admin user
async function addAdminUser() {
  try {
    // Import User model
    const User = require('./models/user');
    
    // Admin user data
    const adminData = {
      name: 'Admin',
      username: 'admin',
      password: await bcrypt.hash('admin123', 10) // Hashed password
    };
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: adminData.username });
    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }
    
    // Create admin user
    const newAdmin = await User.create(adminData);
    console.log('Admin user created successfully:', newAdmin);
    
    // Create another test user with username "zahra"
    const zahraData = {
      name: 'Zahra',
      username: 'zahra',
      password: await bcrypt.hash('zahra123', 10) // Hashed password
    };
    
    // Check if zahra already exists
    const existingZahra = await User.findOne({ username: zahraData.username });
    if (existingZahra) {
      console.log('Zahra user already exists.');
      return;
    }
    
    // Create zahra user
    const newZahra = await User.create(zahraData);
    console.log('Zahra user created successfully:', newZahra);
    
  } catch (error) {
    console.error('Error adding admin user:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the script
connectToMongoDB()
  .then(connected => {
    if (connected) {
      return addAdminUser();
    }
  })
  .catch(console.error); 
