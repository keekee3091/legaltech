const express = require('express');
const router = express.Router();
const Client = require('../models/clients');

// Create a new client
router.post('/', async (req, res) => {
    try {
        const newClient = new Client(req.body);
        const savedClient = await newClient.save();
        res.status(201).json(savedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all clients
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single client by ID
router.get('/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a client by ID
router.patch('/:id', async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a client by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        res.json(deletedClient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
