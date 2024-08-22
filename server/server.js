// server.js
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
app.use(express.json());

// MongoDB connection URI
const mongoURI =
  "mongodb+srv://mukilan:mukilan123@cluster0.c5yb5jt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected to demologin database"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Route to save user data
app.post("/saveUser", async (req, res) => {
  const { uid, email, displayName, providerId } = req.body;

  try {
    const user = new User({ uid, email, displayName, providerId });
    await user.save();
    res.status(201).send("User saved to demologin database");
  } catch (error) {
    res.status(500).send("Error saving user");
  }
});

// Start the server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
