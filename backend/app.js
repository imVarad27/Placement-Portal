const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user-routes");
const adminRoutes = require("./routes/admin-routes");
const imageRoutes = require("./routes/drive-routes");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: "stesstecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api/user/", userRoutes);
app.use("/api/admin/", adminRoutes);
app.use("/api/", imageRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://tempmail1289749:dkte@cluster0.vhdjqoj.mongodb.net/PlacementPortal?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.listen(5500);
