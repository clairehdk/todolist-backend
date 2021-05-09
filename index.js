const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");

const Task = require("./models/Task");
const app = express();
app.use(formidable());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.status(200).json("Vous êtes bien partis");
});

app.post("/add-task", async (req, res) => {
  try {
    const newTask = new Task({
      title: req.fields.title,
      isDone: false,
    });
    await newTask.save();
    res.status(200).json(req.fields);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json("Page introuvable");
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
