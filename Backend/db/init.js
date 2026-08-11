import db from "./connection.js";

const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
    )
`;

db.query(createUsersTable, (err) => {
    if (err) {
        console.error("Failed to create users table:", err);
        return;
    }

    console.log("Users table is ready");
});