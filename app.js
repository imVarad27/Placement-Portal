const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const mongoose = require("mongoose");
const app = express();

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
const studentSchema = new mongoose.Schema({
  PRN: String,
  Sname: String,
  CGPA: Number,
  Stream: String,
  Email: String,
  Batch: Number,
});

const Student = mongoose.model("Student", studentSchema);

app.get("/", async (req, res) => {
  try {
    const students = await Student.find();

    console.log("Found students:", students);

    res.render("students", { students });
  } catch (error) {
    console.log("Error fetching data from MongoDB Atlas:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
