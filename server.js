require('dotenv').config(); // This line loads environment variables from the .env file.

const express = require('express'); // Imports the express library for server operations.
const mongoose = require('mongoose'); // Imports mongoose, which is used for interacting with MongoDB.
const bodyParser = require('body-parser'); // Middleware to parse the body of incoming requests.
const cors = require('cors'); // Middleware to enable CORS (Cross-Origin Resource Sharing).

const productRoutes = require('./routes/products'); // Routes for product operations.
const orderRoutes = require('./routes/orders'); // Routes for order operations.

const app = express(); // Creates an Express application.
const PORT = process.env.PORT || 5000; // Sets the port for the server from environment variable or defaults to 5000.

// Middleware
app.use(cors()); // Enables CORS for all routes.
app.use(bodyParser.json()); // Parses incoming requests with JSON payloads.

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Connects to MongoDB using the URI from .env file.
    .then(() => console.log('MongoDB connected')) // Log on successful connection.
    .catch(err => console.log(err)); // Log if connection fails.

// Routes
app.use('/api/products', productRoutes); // Uses product routes under '/api/products' path.
app.use('/api/orders', orderRoutes); // Uses order routes under '/api/orders' path.

app.listen(PORT, () => { // Starts the server listening on the specified port.
    console.log(`Server running on port ${PORT}`);
});
