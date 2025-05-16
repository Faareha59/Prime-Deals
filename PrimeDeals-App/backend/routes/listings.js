// In the backend (Express server)

const express = require('express');
const Listing = require('../models/Listing');
const router = express.Router();

// Route to fetch all listings
router.get('/listings', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add a new listing (property)
router.post('/listings', async (req, res) => {
  const { description, image, priceRent, priceBuy, location, beds, baths, propertyType, features } = req.body;

  try {
    const newListing = new Listing({
      description,
      image,
      priceRent,
      priceBuy,
      location,
      beds,
      baths,
      propertyType,
      features
    });

    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/listings/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.json(listing); // Send the listing data as JSON
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Update a listing
router.put('/listings/:id', async (req, res) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedListing) {
      return res.status(404).send('Listing not found');
    }
    res.json(updatedListing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a listing
router.delete('/listings/:id', async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) {
      return res.status(404).send('Listing not found');
    }
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
