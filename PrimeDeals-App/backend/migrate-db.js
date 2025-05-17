const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Source and destination database URIs
const sourceUri = 'mongodb://localhost:27017/your_database_name';
const destUri = 'mongodb://localhost:27017/prime_deals_db';
// Define MongoDB connection options
const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

  
  console.log('✅ Connected to source database');
  
  // Connect to destination database
  const destConnection = await mongoose.createConnection(destUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  console.log('✅ Connected to destination database');
  
  return { sourceConnection, destConnection };
}

// Get all collection names from source database
async function getCollectionNames(connection) {
  const collections = await connection.db.listCollections().toArray();
  return collections.map(collection => collection.name);
}

// Migrate data from one collection
async function migrateCollection(collectionName, sourceConnection, destConnection) {
  console.log(`Migrating collection: ${collectionName}`);
  
  // Get source collection
  const sourceCollection = sourceConnection.db.collection(collectionName);
  
  // Get all documents from source collection
  const documents = await sourceCollection.find({}).toArray();
  console.log(`Found ${documents.length} documents in ${collectionName}`);
  
  if (documents.length > 0) {
    // Insert documents into destination collection
    const destCollection = destConnection.db.collection(collectionName);
    const result = await destCollection.insertMany(documents);
    console.log(`✅ Migrated ${result.insertedCount} documents to ${collectionName}`);
  }
}

// Main migration function
async function migrateDatabase() {
  try {
    const { sourceConnection, destConnection } = await connectToDatabases();
    
    // Get all collection names
    const collections = await getCollectionNames(sourceConnection);
    console.log(`Collections to migrate: ${collections.join(', ')}`);
    
    // Migrate each collection
    for (const collection of collections) {
      await migrateCollection(collection, sourceConnection, destConnection);
    }
    
    console.log('✅ Migration completed successfully');
    
    // Close connections
    await sourceConnection.close();
    await destConnection.close();
    
    // Log summary to file
    const summary = {
      timestamp: new Date().toISOString(),
      sourceDatabase: 'your_database_name',
      destinationDatabase: 'prime_deals_db',
      collectionsMigrated: collections,
    };
    
    fs.writeFileSync(
      path.join(__dirname, 'migration-summary.json'),
      JSON.stringify(summary, null, 2)
    );
    
    console.log('Migration summary saved to migration-summary.json');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
migrateDatabase(); 
