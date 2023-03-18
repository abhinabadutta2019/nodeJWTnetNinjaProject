const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
// const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb://127.0.0.1:27017/15th-March";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home.ejs"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies.ejs"));

//routes app.use
app.use(authRoutes);
