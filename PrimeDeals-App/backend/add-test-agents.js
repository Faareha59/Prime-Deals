// Script to add test agents to MongoDB
const mongoose = require('mongoose');

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/your_database_name';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB database:', mongoose.connection.name);
  addTestAgents();
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Function to add test agents
async function addTestAgents() {
  try {
    // Import Agent model
    const Agent = require('./models/agent');
    
    // Sample agent data
    const testAgents = [
      {
        name: 'John Smith',
        email: 'john.smith@primedeals.com',
        phoneNo: '+92 345 1234567',
        nationality: 'Pakistani',
        location: 'Karachi, Pakistan',
        language: 'English, Urdu',
        profilePic: 'https://via.placeholder.com/150',
        rating: 4.8,
        specialization: 'Residential',
        experience: '8 years',
        bio: 'Experienced real estate agent specializing in luxury homes.'
      },
      {
        name: 'Sarah Khan',
        email: 'sarah.khan@primedeals.com',
        phoneNo: '+92 321 9876543',
        nationality: 'Pakistani',
        location: 'Lahore, Pakistan',
        language: 'English, Urdu, Punjabi',
        profilePic: 'https://via.placeholder.com/150',
        rating: 4.6,
        specialization: 'Commercial',
        experience: '6 years',
        bio: 'Commercial property expert with excellent negotiation skills.'
      },
      {
        name: 'Ali Hassan',
        email: 'ali.hassan@primedeals.com',
        phoneNo: '+92 333 4567890',
        nationality: 'Pakistani',
        location: 'Islamabad, Pakistan',
        language: 'English, Urdu',
        profilePic: 'https://via.placeholder.com/150',
        rating: 4.9,
        specialization: 'Luxury',
        experience: '10 years',
        bio: 'Luxury property specialist serving high-end clients.'
      }
    ];
    
    // Check if collection exists and is empty
    const count = await Agent.countDocuments();
    if (count > 0) {
      console.log(`Agents collection already has ${count} documents. Skipping insertion.`);
      console.log('Current agents in database:');
      const existingAgents = await Agent.find();
      existingAgents.forEach((agent, i) => {
        console.log(`${i+1}. ${agent.name} (${agent.email})`);
      });
    } else {
      // Insert test agents
      const result = await Agent.insertMany(testAgents);
      console.log(`Successfully added ${result.length} test agents:`);
      result.forEach((agent, i) => {
        console.log(`${i+1}. ${agent.name} (${agent.email})`);
      });
    }
  } catch (error) {
    console.error('Error adding test agents:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
} 
