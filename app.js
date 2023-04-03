const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

const uri =
  "mongodb+srv://varadghatage7:dkte123@cluster0.oobtyew.mongodb.net/mongodbVSCodePlaygroundDB?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB Atlas", err);
  });

// Define the student schema
const studentSchema = new mongoose.Schema({
  PRN: String,
  Sname: String,
  CGPA: Number,
  Stream: String,
  Email: String,
  Batch: Number,
});

// Define the Student model
const Student = mongoose.model("Student", studentSchema);

app.get("/", async (req, res) => {
  try {
    // Find all documents in the Student collection
    const students = await Student.find();

    console.log("Found students:", students);

    // Render the students view with the data
    res.render("students", { students });
  } catch (error) {
    console.log("Error fetching data from MongoDB Atlas:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
