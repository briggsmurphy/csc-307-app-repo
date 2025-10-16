import express from "express";
import cors from "cors";
import "./db.js";
import User from "./models/user.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// GET /users?name=&job=
app.get("/users", async (req, res) => {
  try {
    const { name, job } = req.query;
    const query = {};
    if (name) query.name = new RegExp(name, "i");
    if (job) query.job = new RegExp(job, "i");

    const users = await User.find(query);
    res.json({ users_list: users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /users/:id
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("Resource not found.");
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// POST /users
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /users/:id
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send("User not found.");
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

