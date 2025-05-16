// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const user = require('../models/user'); // Import the User model
const router = express.Router();

// POST route for user signup
router.post('/Signup', async (req, res) => {
  const { name, username, password } = req.body;
  console.log('Signup attempt:', { name, username });

  try {
    // Simulate error for missing fields
    if (!name || !username || !password) {
      throw new Error("All fields are required");
    }

    // Check if the username already exists
    const existingUser = await user.findOne({ username });
    if (existingUser) {
      throw new Error("Username already taken");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new user({ name, username, password: hashedPassword });
    console.log('Before saving user:')

    // Save the new user to the database
    await newUser.save();
    console.log('After saving user:')

    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    console.error('Error during Signup:', err);
    res.status(400).json({ error: err.message });
  }
});

// POST route for user login
router.post('/Login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt for user:', username);
  
  try {
    // Check if the user exists in the database
    console.log('Searching for user in database');
    const existingUser = await user.findOne({ username });
    if (!existingUser) {
      console.log('User not found in database');
      throw new Error("User not found");
    }
    console.log('User found:', { id: existingUser._id, name: existingUser.name });

    // Compare the provided password with the stored hash
    console.log('Comparing passwords');
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      console.log('Password does not match');
      throw new Error("Invalid credentials");
    }
    console.log('Password matched');

    // Create user object without sensitive data
    const userData = {
      id: existingUser._id,
      name: existingUser.name,
      username: existingUser.username
    };
    console.log('User data prepared:', userData);

    // Login successful - include user data that the frontend expects
    console.log('Sending success response');
    res.json({ 
      success: true, 
      message: 'Login successful!',
      user: userData
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router; // Export the routes
