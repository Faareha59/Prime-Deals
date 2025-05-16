const express = require('express');
const router = express.Router();

// Example agents data (this should be replaced with a real database)
let agents = [
  { _id: "1", name: "John Doe", rating: 4.5, nationality: "USA", location: "New York", language: "English", email: "johndoe@example.com", phoneNo: "1234567890", sale: 10, rent: 5 },
  { _id: "2", name: "Jane Smith", rating: 4.8, nationality: "Canada", location: "Toronto", language: "English, French", email: "janesmith@example.com", phoneNo: "0987654321", sale: 20, rent: 10 },
  // Add more agents here as needed
];

// Get all agents
router.get('/api/agents', (req, res) => {
  res.json(agents);
});

// Get agent by name
router.get('/api/agents/:name', (req, res) => {
  const { name } = req.params;
  const agent = agents.find(agent => agent.name.toLowerCase() === name.toLowerCase());
  if (agent) {
    res.json(agent);
  } else {
    res.status(404).json({ message: 'Agent not found' });
  }
});

// Add new agent
router.post('/api/agents', (req, res) => {
  const { name, rating, nationality, location, language, email, phoneNo, sale, rent } = req.body;
  const newAgent = { 
    _id: Date.now().toString(), 
    name, 
    rating, 
    nationality, 
    location, 
    language, 
    email, 
    phoneNo, 
    sale, 
    rent 
  };
  agents.push(newAgent);
  res.status(201).json(newAgent);
});

// Delete agent by ID
router.delete('/api/agents/:id', (req, res) => {
  const { id } = req.params;
  const index = agents.findIndex(agent => agent._id === id);
  if (index !== -1) {
    agents.splice(index, 1);
    res.status(200).json({ message: 'Agent deleted successfully' });
  } else {
    res.status(404).json({ message: 'Agent not found' });
  }
});

// Update agent by ID
router.put('/api/agents/:id', (req, res) => {
  const { id } = req.params;
  const { name, rating, nationality, location, language, email, phoneNo, sale, rent } = req.body;
  const agent = agents.find(agent => agent._id === id);
  if (agent) {
    agent.name = name;
    agent.rating = rating;
    agent.nationality = nationality;
    agent.location = location;
    agent.language = language;
    agent.email = email;
    agent.phoneNo = phoneNo;
    agent.sale = sale;
    agent.rent = rent;
    res.status(200).json(agent);
  } else {
    res.status(404).json({ message: 'Agent not found' });
  }
});

module.exports = router;
