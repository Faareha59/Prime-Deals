//models/agent.js
const mongoose = require('mongoose');
const { Schema } = mongoose; // Add this line to destructure Schema from mongoose

const agentSchema = new Schema({
  name: { type: String, required: true },
  profilePic: { type: String },
// Correctly define the properties field
  rating: { type: Number },
  nationality: { type: String },
  location: { type: String },
  language: { type: String },
  email: { type: String, required: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
  phoneNo: { type: String },
  specialization: { type: String },
  experience: { type: String },
  bio: { type: String }
});

// Pre-save middleware to ensure name is always set
agentSchema.pre('save', function(next) {
  // If name is not provided or is empty, generate one from email
  if (!this.name && this.email) {
    const namePrefix = this.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ');
    this.name = `${namePrefix.charAt(0).toUpperCase() + namePrefix.slice(1)} (Auto-named)`;
    console.log(`Auto-generated name for agent: ${this.name}`);
  }
  next();
});

// Explicitly set the collection name to 'agents'
const Agent = mongoose.model('Agent', agentSchema, 'agents');

module.exports = Agent;
