const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const ContactData = require('./models/contactData');
const PropertiesModel = require('./models/Properties');
const AppointmentModel = require('./models/Appointments');
const listingsRouter = require('./routes/listings');
const { ensureAgentsCollection } = require('./utils/dbHelper');

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

// Serve static images from the public folder
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/routeAgent', require('./routes/routeAgent'));

// Use listings routes
app.use('/api', listingsRouter);

// Add a test route to verify listings functionality
app.get('/api/listings/test', (req, res) => {
  res.json({ message: 'Listings route is working' });
});

// Add a test route to force agent creation
app.get('/api/test/createAgent', async (req, res) => {
  try {
    const Agent = require('./models/agent');
    const testAgent = {
      name: 'API Test Agent',
      email: 'api.test@example.com',
      phoneNo: '+92 300 3333333',
      nationality: 'Pakistani',
      location: 'API Test City, Pakistan',
      language: 'English, Urdu',
      profilePic: 'https://via.placeholder.com/150',
      rating: 4.3,
      specialization: 'Luxury',
      experience: '7 years',
      bio: 'This is a test agent created via API endpoint.'
    };
    
    const createdAgent = await Agent.create(testAgent);
    res.status(201).json({ 
      success: true, 
      message: 'Test agent created successfully',
      agent: createdAgent 
    });
  } catch (error) {
    console.error('Error creating test agent:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create test agent',
      error: error.message 
    });
  }
});

app.post('/Properties/add', async (req, res) => {
    try {
        console.log('Received property data:', req.body);
        
        const propertyData = {
            image: req.body.images,
            type: req.body.type,
            location: req.body.location,
            buy: req.body.buy,
            rent: req.body.rent,
            beds: req.body.beds,
            baths: req.body.baths,
            agent: req.body.agent,
            description: req.body.desc,
            features: req.body.features,
        };

        console.log('Creating property with data:', propertyData);
        
        const result = await PropertiesModel.create(propertyData);
        console.log('Property created successfully:', result);
        
        res.status(201).json({ 
            success: true, 
            message: 'Property added successfully',
            data: result 
        });
    } catch (err) {
        console.error('Error adding property:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to add property',
            error: err.message 
        });
    }
});

app.post('/Appointments/Book', (req, res) => {
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const email = req.body.email;
    const purchaseType = req.body.purchaseType || 'buy'; // Default to 'buy' if not provided
    const date = req.body.date;
    const time = req.body.time;

    AppointmentModel.create(
        {
            firstName: fname,
            lastName: lname,
            email: email,
            purchaseType: purchaseType,
            date: date,
            time: time,
        }
    ).then(() => {
        res.status(200).json({ message: 'Appointment booked successfully' })
    })
   .catch((err)=>{
    res.status(500).json({ error: 'Failed to book appointment: ' + err.message })
   })
});

// API fetch karne ke liya contact data
app.get('/Contacts/get', (req, res) => {
    ContactData.find()
      .then(result => res.json(result))
      .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/Contacts/add', (req, res) => {
    const { Fullname, Number, Email, Message } = req.body;
  
    if (!Fullname || !Email || !Number || !Message) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }
  
    ContactData.create({
      fullname: Fullname,
      number: Number,
      email: Email,
      message: Message,
    })
      .then(result => res.json({ success: true, result }))
      .catch(err => {
        console.error("Error while saving contact data:", err);
        res.status(500).json({ success: false, error: err.message });
      });
});

// Add a direct insertion route for agents
app.get('/api/direct/createAgent', async (req, res) => {
  try {
    // Get the Agent model directly
    const Agent = mongoose.model('Agent');
    
    // Create a simple agent document
    const directAgent = {
      name: 'Direct API Agent',
      email: `direct.api.${Date.now()}@example.com`, // Unique email
      phoneNo: '+92 300 7777777',
      nationality: 'Pakistani',
      location: 'Direct API City, Pakistan',
      language: 'English, Urdu',
      profilePic: 'https://via.placeholder.com/150',
      rating: 4.7,
      specialization: 'Industrial',
      experience: '4 years',
      bio: 'This is a test agent created with direct model access.'
    };
    
    console.log('About to create agent with direct model:', directAgent);
    
    // Insert directly using Mongoose
    const createdAgent = await Agent.create(directAgent);
    
    console.log('Direct agent insertion successful with ID:', createdAgent._id);
    console.log('Collection used:', Agent.collection.name);
    console.log('Database used:', mongoose.connection.name);
    
    // Verify the agent exists by querying for it
    const foundAgent = await Agent.findOne({ email: directAgent.email });
    
    res.status(201).json({
      success: true,
      message: 'Direct agent creation successful',
      agent: createdAgent,
      foundAgent: foundAgent,
      collectionName: Agent.collection.name,
      databaseName: mongoose.connection.name
    });
  } catch (error) {
    console.error('Error in direct agent creation:', error);
    res.status(500).json({
      success: false,
      message: 'Direct agent creation failed',
      error: error.message,
      stack: error.stack
    });
  }
});

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prime_deals_db';
    console.log('Attempting to connect to MongoDB with URI:', mongoURI);
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB successfully');
    console.log('Database name:', mongoose.connection.name);
    console.log('Connection state:', mongoose.connection.readyState);
    
    // Ensure the agents collection exists and is properly set up
    await ensureAgentsCollection();
    
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Initialize MongoDB connection
connectDB();

app.listen(3002, ()=> {
    console.log('Server is running on port 3002');
});

app.get('/', (req, res) => {
    res.send('Backend is running');
});