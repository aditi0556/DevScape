import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Temporary in-memory storage
let users = [];

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "name and email are required",
    });
  }

  const user = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(user);

  res.status(201).json({
    message: "User added successfully",
    user,
  });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});