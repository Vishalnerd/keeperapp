const express = require("express");
const app = express();
require("./conn/conn");
const cors = require("cors");
const path = require("path");

// Import routes
const authRoutes = require("./routes/auth");
const listRoutes = require("./routes/list");

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for all requests

// API routes
app.use("/api/v1", authRoutes); // Mount auth routes
app.use("/api/v2", listRoutes); // Mount list routes

// Serve static files (e.g., React frontend)
const buildPath = path.resolve(__dirname, "./frontend/build");
app.use(express.static(buildPath));

// Serve index.html for all other routes (client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
