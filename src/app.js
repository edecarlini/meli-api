const express = require('express');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes/itemRoutes');
require('dotenv').config();

const app = express();

// Configuración básica de CORS
// app.use(cors());

//  Configuración avanzada de CORS (opcional)
const corsOptions = {
    origin: `${process.env.FRONTEND_API_URL}`, // Cambia esto a la URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/items', itemRoutes);

module.exports = app;
