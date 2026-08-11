import express from "express";
import db from "./db/connection.js";
import "./db/init.js";

const app = express();

app.use(express.json());

app.post("/users",(req,res)=>{
    const { name, email } = req.query;

    if (!name || !email) {
       return res.status(400).json({
         error: "name and email are required",
       });
    }

    const sql = `
        INSERT INTO users (name, email)
        VALUES (?, ?)
    `;

    db.query(sql, [name, email], (err, result) => {
    if (err) {
        console.error(err);

        return res.status(500).json({
        error: "Failed to add user",
        });
    }

    res.status(201).json({
        message: "User added successfully",
        user: {
            id: result.insertId,
            name,
            email,
        },
    });
    });
})

app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: "Database query failed"
            });
        }

        res.json(result);
    });
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});