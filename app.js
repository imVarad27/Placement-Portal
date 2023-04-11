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
  Name: String,
  CGPA: Number,
  Stream: String,
  Email: String,
  Batch: Number,
  Password: String,
  IsSelected: Boolean,
  KT: Boolean,
  Company: String,
});

const Student = mongoose.model("StudentDB", studentSchema, "StudentDB");
app.get("/", async (req, res) => {
  try {
    const students = await Student.find({ IsSelected: false }).sort({ PRN: 1 });

    console.log("Found students:", students);

    res.render("students", { students });
  } catch (error) {
    console.log("Error fetching data from MongoDB Atlas:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/isSelected", async (req, res) => {
  try {
    const selectedStudents = await Student.find({ IsSelected: true });

    console.log("Found selected students:", selectedStudents);

    res.render("isSelected", { selectedStudents });
  } catch (error) {
    console.log("Error fetching data from MongoDB Atlas:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/SelectedCSE", async (req, res) => {
  try {
    const selectedStudents = await Student.find({
      IsSelected: true,
      Stream: "Computer Science and Engineering",
    });

    console.log("Found selected students:", selectedStudents);

    res.render("SelectedCSE", { selectedStudents });
  } catch (error) {
    console.log("Error fetching data from MongoDB Atlas:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/SelectedENTC", async (req, res) => {
  try {
    const selectedStudents = await Student.find({
      IsSelected: true,
      Stream: "Electronics and Telecommunication Engineering",
    });

    console.log("Found selected students:", selectedStudents);

    res.render("SelectedENTC", { selectedStudents });
  } catch (error) {
    console.log("Error fetching data from MongoDB Atlas:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/SelectedEE", async (req, res) => {
  try {
    const selectedStudents = await Student.find({
      IsSelected: true,
      Stream: "Electrical Engineering",
    });

    console.log("Found selected students:", selectedStudents);

    res.render("SelectedEE", { selectedStudents });
  } catch (error) {
    console.log("Error fetching data from MongoDB Atlas:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
