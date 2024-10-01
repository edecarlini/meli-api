const express = require('express');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes/itemRoutes');
require('dotenv').config();

const app = express();

const corsOptions = {
    origin: `${process.env.FRONTEND_API_URL}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/items', itemRoutes);

module.exports = app;
