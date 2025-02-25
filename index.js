const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');

const db = require('./config/db')

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For URL-encoded form data

// Define routes
app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.use('/user', userRoutes);
app.use('/project', projectRoutes);

// Global error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Sync models & create tables in MySQL
db
  .sync({ alter: true }) // ✅ Creates tables if not exist, updates schema if changed
  .then(() => {
    console.log("✅ Database & tables synced successfully!");
  })
  .catch((err) => {
    console.error("❌ Error syncing database:", err);
  });


// Start server
const PORT = process.env.PORT || 3000; // Use .env PORT or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
