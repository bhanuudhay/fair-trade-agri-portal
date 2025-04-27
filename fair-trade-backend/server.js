const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const produceRoutes = require("./routes/produceRoutes");
const authRoutes = require("./routes/authRoutes");
const farmerAuthRoutes = require("./routes/farmerAuth");
const buyerAuthRoutes = require("./routes/buyerAuth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/produce", produceRoutes);
app.use("/api/farmer", farmerAuthRoutes);
app.use("/api/buyer", buyerAuthRoutes);

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
