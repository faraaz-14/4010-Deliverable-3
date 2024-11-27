const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3003;


const uri = 'mongodb+srv://4010group:test@quickwhip.kpxfz.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.static(path.join(__dirname)));

// Filterd
app.get('/api/filters', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('quickwhip');
        const collection = database.collection('vehicles');
        const makes = await collection.distinct('make');
        const years = await collection.distinct('year');
        const colors = await collection.distinct('color');

        // Rates
        const rateRanges = [
            { label: "700-800", min: 700, max: 800 },
            { label: "800-900", min: 800, max: 900 },
            { label: "900-1000", min: 900, max: 1000 },
            { label: "1000-1100", min: 1000, max: 1100 },
            { label: "1100-1200", min: 1100, max: 1200 },
            { label: "1200-1300", min: 1200, max: 1300 },
            { label: "1300-2000", min: 1300, max: 2000 }
        ];

        res.json({ makes, years, rateRanges, colors });
    } catch (error) {
        console.error('Error retrieving filters:', error);
        res.status(500).send('Error retrieving filters');
    } finally {
        await client.close();
    }
});

// Query for make (Make may be done independently from Model, but model must be filled out in order to query )
app.get('/api/models', async (req, res) => {
    const make = req.query.make;
    try {
        if (!make) {
            return res.status(400).send('Make is required to fetch models');
        }

        await client.connect();
        const database = client.db('quickwhip');
        const collection = database.collection('vehicles');

        const models = await collection.distinct('model', { make: make });
        res.json({ models });
    } catch (error) {
        console.error('Error retrieving models:', error);
        res.status(500).send('Error retrieving models');
    } finally {
        await client.close();
    }
});

// Query http methods
app.get('/api/vehicles', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('quickwhip');
        const collection = database.collection('vehicles');

        // Queriies 
        const query = {};
        if (req.query.make) query.make = req.query.make;
        if (req.query.model) query.model = req.query.model;
        if (req.query.year) query.year = parseInt(req.query.year);
        if (req.query.color) query.color = req.query.color;

        // Rate searching
        if (req.query.rateRange) {
            const [min, max] = req.query.rateRange.split('-').map(Number);
            query.rate = { $gte: min, $lt: max };
        }

        const vehicles = await collection.find(query).toArray();
        res.json(vehicles);
    } catch (error) {
        console.error('Error querying vehicles:', error);
        res.status(500).send('Error querying vehicles');
    } finally {
        await client.close();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
