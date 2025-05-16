const express = require('express');
const Agent = require('../models/agent');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');

// Validation Schema for Agent
const agentValidationSchema = Joi.object({
  name: Joi.string().required(),
  profilePic: Joi.string().optional(),
  sale: Joi.number().integer().min(0).optional(),
  rent: Joi.number().integer().min(0).optional(),
  nationality: Joi.string().optional(),
  location: Joi.string().optional(),
  language: Joi.string().optional(),
  email: Joi.string().email().required(),
  phoneNo: Joi.string().optional(),
  rating: Joi.number().optional(),
  specialization: Joi.string().optional(),
  experience: Joi.string().optional(),
  bio: Joi.string().optional()
});

// Middleware for Request Validation
const validateAgent = (req, res, next) => {
  const { error } = agentValidationSchema.validate(req.body);
  if (error) {
    console.error('Validation error:', error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Add agent
router.post('/add', validateAgent, async (req, res) => {
    const { 
      name, 
      profilePic, 
      rating, 
      nationality, 
      location, 
      language, 
      email, 
      phoneNo,
      specialization,
      experience,
      bio
    } = req.body;
    
    console.log('Attempting to insert agent data:', req.body);
    console.log('Current MongoDB database:', mongoose.connection.name);
    console.log('Collection being used:', Agent.collection.name);
  
    // Check for existing agent by email
    try {
      const existingAgent = await Agent.findOne({ email });
      if (existingAgent) {
        console.log('Agent already exists with email:', email);
        return res.status(400).json({ message: 'Agent with this email already exists' });
      }
    
      const newAgent = new Agent({
        name,
        profilePic,
        rating,
        nationality,
        location,
        language,
        email,
        phoneNo,
        specialization,
        experience,
        bio
      });
    
      console.log('New agent object created:', newAgent);
      
      const savedAgent = await newAgent.save();
      console.log('Agent saved successfully with ID:', savedAgent._id);
      res.status(201).json(savedAgent);
    } catch (err) {
      console.error('Error adding agent:', err); // Detailed error log
      res.status(500).json({ message: 'Error adding agent', error: err.message, stack: err.stack });
    }
});

// Update agent
router.put('/:id', validateAgent, async (req, res) => {
  try {
    const updatedAgent = await Agent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!updatedAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    
    res.status(200).json(updatedAgent);
  } catch (err) {
    console.error('Error updating agent:', err);
    res.status(500).json({ message: 'Error updating agent', error: err.message });
  }
});

// Delete agent
router.delete('/:id', async (req, res) => {
  try {
    const deletedAgent = await Agent.findByIdAndDelete(req.params.id);
    
    if (!deletedAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    
    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (err) {
    console.error('Error deleting agent:', err);
    res.status(500).json({ message: 'Error deleting agent', error: err.message });
  }
});

// Get All Agents
router.get('/getAgents', async (req, res) => {
  try {
    console.log('Fetching all agents from collection:', Agent.collection.name);
    const agents = await Agent.find();
    console.log(`Found ${agents.length} agents`);
    res.status(200).json(agents);
  } catch (err) {
    console.error('Error fetching agent data:', err);
    res.status(500).json({ message: 'Error fetching agent data', error: err.message });
  }
});

// Get Agent by ID (Updated from using name)
router.get('/:id', async (req, res) => {
  const { id } = req.params;  // Get the ID from URL parameter
  
  try {
    const agent = await Agent.findById(id);  // Search for agent by ID
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.json(agent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Export router
module.exports = router;
