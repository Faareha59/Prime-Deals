// Script to fix missing agent names in MongoDB
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Define MongoDB connection options
const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name';
    console.log('Connecting to MongoDB:', mongoURI);
    
    await mongoose.connect(mongoURI, connectOptions);
    console.log('✅ MongoDB connection successful');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    return false;
  }
}

// Fix missing agent names
async function fixMissingAgentNames() {
  // Make sure we have access to the Agent model
  const Agent = require('./models/agent');
  
  try {
    console.log('Searching for agents with missing names...');
    
    // Find agents without names
    const agentsWithoutNames = await Agent.find({ $or: [
      { name: { $exists: false } },
      { name: null },
      { name: '' }
    ]});
    
    console.log(`Found ${agentsWithoutNames.length} agents with missing names`);
    
    // Update each agent with a default name
    let updatedCount = 0;
    for (const agent of agentsWithoutNames) {
      if (agent.email) {
        // Generate a default name from email
        const namePrefix = agent.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ');
        const defaultName = `${namePrefix.charAt(0).toUpperCase() + namePrefix.slice(1)} (Auto-named)`;
        
        console.log(`Updating agent ${agent._id} with default name: ${defaultName}`);
        
        // Update the agent
        agent.name = defaultName;
        await agent.save();
        updatedCount++;
      } else {
        console.log(`Unable to update agent ${agent._id}: No email available`);
      }
    }
    
    console.log(`Successfully updated ${updatedCount} agents with default names`);
    
    // List all agents to verify
    const allAgents = await Agent.find();
    console.log(`\nCurrent agents in database (${allAgents.length} total):`);
    allAgents.forEach((agent, i) => {
      console.log(`${i+1}. ${agent.name || 'NO NAME'} (Email: ${agent.email || 'N/A'}) - ID: ${agent._id}`);
    });
    
    return updatedCount;
  } catch (error) {
    console.error('Error fixing agent names:', error);
    return 0;
  }
}

// Main function
async function main() {
  const connected = await connectToMongoDB();
  
  if (connected) {
    try {
      await fixMissingAgentNames();
    } catch (error) {
      console.error('Error in main function:', error);
    } finally {
      // Close the MongoDB connection
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  }
}

// Run the script
main(); 