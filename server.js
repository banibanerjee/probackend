require("dotenv").config(); // ✅ Corrected dotenv
const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const contactRoute = require("./router/contactRoute");

const app = express();


// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Connect to MongoDB
// const mongoURI = process.env.MONGO_URI;
// if (!mongoURI) {
//   console.error("MongoDB URI is missing in .env file.");
//   process.exit(1);
// }

// mongoose
//   .connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected successfully!"))
//   .catch((err) => console.log("❌ MongoDB connection error:", err));

// Routes
app.use("/", contactRoute);

if (process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
  app.get("*", (req,res) => 
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);
}

// Start Server
const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
