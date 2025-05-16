// Direct MongoDB insertion test
const { MongoClient } = require('mongodb');

async function main() {
  // Connection URL
  const url = 'mongodb://localhost:27017';
  const client = new MongoClient(url);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Access the database
    const db = client.db('your_database_name');
    console.log('Using database:', db.databaseName);
    
    // Access (or create) the agents collection
    const collection = db.collection('agents');
    console.log('Using collection:', collection.collectionName);
    
    // Create a test document
    const testAgent = {
      name: 'Direct MongoDB Test Agent',
      email: 'direct.test@example.com',
      phoneNo: '+92 300 5555555',
      nationality: 'Pakistani',
      location: 'Direct Test City, Pakistan',
      language: 'English, Urdu',
      profilePic: 'https://via.placeholder.com/150',
      rating: 4.5,
      specialization: 'Residential',
      experience: '5 years',
      bio: 'This is a test agent created with direct MongoDB driver.'
    };
    
    // Insert the document
    const result = await collection.insertOne(testAgent);
    console.log('Inserted test agent with ID:', result.insertedId);
    
    // Verify the insertion by fetching the document
    const insertedAgent = await collection.findOne({ email: testAgent.email });
    console.log('Retrieved the inserted agent:', insertedAgent);
    
    // List all documents in the collection
    const allAgents = await collection.find({}).toArray();
    console.log(`Found ${allAgents.length} agents in the collection:`);
    allAgents.forEach((agent, index) => {
      console.log(`${index + 1}. ${agent.name} (${agent.email})`);
    });

    // Check if any agents are missing names
    const missingNameAgents = await collection.find({ name: { $exists: false } }).toArray();
    if (missingNameAgents.length > 0) {
      console.log(`Found ${missingNameAgents.length} agents missing names:`);
      for (const agent of missingNameAgents) {
        console.log(`Agent with ID ${agent._id} is missing a name. Email: ${agent.email || 'Unknown'}`);
        
        // Update the agent with a default name if needed
        if (agent.email) {
          const namePrefix = agent.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ');
          const defaultName = `${namePrefix.charAt(0).toUpperCase() + namePrefix.slice(1)} (Auto-named)`;
          
          console.log(`Updating agent ${agent._id} with default name: ${defaultName}`);
          const updateResult = await collection.updateOne(
            { _id: agent._id },
            { $set: { name: defaultName } }
          );
          console.log(`Update result: ${updateResult.modifiedCount} document(s) modified`);
        }
      }
    } else {
      console.log('All agents have names properly set.');
    }

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
main().catch(console.error); 