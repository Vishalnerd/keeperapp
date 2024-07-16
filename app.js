const express = require("express");
const app = express();
const cors = require("cors");
require("./conn/conn"); // Ensure your database connection is properly established
const path = require("path");
const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(express.json());
app.use(cors());

// Define your API routes
app.use("/api/v1", auth); // Assuming auth routes are defined in ./routes/auth
app.use("/api/v2", list); // Assuming list routes are defined in ./routes/list

// Handle registration endpoint
app.post('/api/v1/register', (req, res) => {
    // Handle registration logic here
    res.status(200).json({ message: "User registered successfully" });
});

// Serve static files from the frontend build directory


// Handle all other routes by sending the index.html file
app.get("/", (req, res) => {
    res.send("hello");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
