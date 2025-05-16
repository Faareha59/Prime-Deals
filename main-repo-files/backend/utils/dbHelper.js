const mongoose = require('mongoose');

/**
 * Function to ensure the agents collection exists and has the proper schema
 */
async function ensureAgentsCollection() {
  try {
    // Get the database instance
    const db = mongoose.connection.db;
    console.log('Current database being used:', mongoose.connection.name);
    
    // Check if the agents collection exists
    const collections = await db.listCollections({ name: 'agents' }).toArray();
    if (collections.length === 0) {
      console.log('agents collection does not exist, creating it...');
      await db.createCollection('agents');
      console.log('agents collection created successfully');
    } else {
      console.log('agents collection exists');
    }
    
    // Create a test agent to verify collection functionality
    const Agent = require('../models/agent');
    const testAgent = {
      name: 'DB Helper Test Agent',
      email: 'dbhelper.test@example.com',
      phoneNo: '+92 300 2222222',
      nationality: 'Pakistani',
      location: 'Test City, Pakistan',
      language: 'English, Urdu',
      profilePic: 'https://via.placeholder.com/150',
      rating: 4.2,
      specialization: 'Commercial',
      experience: '2 years',
      bio: 'This is a test agent created by dbHelper to verify collection functionality.'
    };
    
    // Check if test agent already exists
    const existingTestAgent = await Agent.findOne({ email: testAgent.email });
    if (!existingTestAgent) {
      console.log('Creating test agent from dbHelper...');
      const createdAgent = await Agent.create(testAgent);
      console.log('Test agent created with ID:', createdAgent._id);
    } else {
      console.log('dbHelper: Test agent already exists with ID:', existingTestAgent._id);
    }
    
    return true;
  } catch (error) {
    console.error('Error ensuring agents collection:', error);
    return false;
  }
}

module.exports = {
  ensureAgentsCollection
}; 