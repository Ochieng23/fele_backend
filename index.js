const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const listEndpoints = require("express-list-endpoints"); // Import added here
require("dotenv").config();

// Initialize Express app
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Configure sessions and store them in MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretKey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || "mongodb://localhost:27017/mydb",
    }),
  })
);

// Initialize Passport and sessions
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

// Mount auth routes
const authRoutes = require("./Routes/authRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
app.use("/auth", authRoutes);
app.use("/vendor",vendorRoutes)
app.use("/campaign", campaignRoutes);

// Log all endpoints for debugging purposes
console.log(listEndpoints(app));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
