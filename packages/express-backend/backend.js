// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" },
    { id: "qwe123", name: "Cindy", job: "Zookeeper" }
  ]
};

// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());

// Helper functions
const findUserById = (id) => users.users_list.find(u => u.id === id);
const findUserByName = (name) =>
  users.users_list.filter(u => u.name.toLowerCase() === name.toLowerCase());

// Function to generate a random ID
function generateId() {
  return Math.random().toString(36).substr(2, 6); // generates a 6-character string
}

// GET all users or filter by name via query ?name=
app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name) {
    const filtered = findUserByName(name);
    res.send({ users_list: filtered });
  } else {
    res.send(users);
  }
});

// SEARCH users by name and/or job via query ?name=&job=
app.get("/users/search", (req, res) => {
  const { name, job } = req.query;
  const results = users.users_list.filter(u => {
    return (
      (!name || u.name.toLowerCase() === name.toLowerCase()) &&
      (!job || u.job.toLowerCase() === job.toLowerCase())
    );
  });
  res.send({ users_list: results });
});

// GET a user by ID
app.get("/users/:id", (req, res) => {
  const user = findUserById(req.params.id);
  if (!user) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(user);
  }
});

// POST a new user
app.post("/users", (req, res) => {
  const newUser = req.body;
  newUser.id = generateId();         // Assign a new ID
  users.users_list.push(newUser);    // Add to the list
  res.status(201).send(newUser);     // Return the updated object with 201 status
});

// DELETE a user by ID
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const index = users.users_list.findIndex(u => u.id === id);

  if (index === -1) {
    res.status(404).send("User not found.");
  } else {
    users.users_list.splice(index, 1);
    res.status(204).send(); // No content returned
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

