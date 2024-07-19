const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://goodvibes:db@cluster0.f2dnf9t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
 useNewUrlParser: true,
 useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
 .catch(err => console.log(err));

// Routes
const journeyRoutes = require('./routes/Journeys');

app.use('/api/journeys', journeyRoutes);

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
