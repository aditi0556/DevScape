import express from "express";
import cors from "cors";
import { db, waitForDb } from "./connection.js";
import initDb from "./init.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "name and email are required",
    });
  }

  const sql = `
    INSERT INTO users (name, email)
    VALUES (?, ?)
  `;

  try {
    const [result] = await db.query(sql, [name, email]);

    res.status(201).json({
      message: "User added successfully",
      user: {
        id: result.insertId,
        name,
        email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to add user",
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM users");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

async function startServer() {
  await waitForDb();
  await initDb();

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err.message);
  process.exit(1);
});