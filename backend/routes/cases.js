const express = require('express');
const router = express.Router();
const Case = require('../models/Case');

// Create a new case
router.post('/', async (req, res) => {
  try {
    const newCase = new Case(req.body);
    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all cases
router.get('/', async (req, res) => {
  try {
    const cases = await Case.find();
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single case by ID
router.get('/:id', async (req, res) => {
  try {
    const singleCase = await Case.findById(req.params.id);
    if (!singleCase) {
      return res.status(404).json({ message: "Case not found" });
    }
    res.json(singleCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a case by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a case by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    res.json(deletedCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
