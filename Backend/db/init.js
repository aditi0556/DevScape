import { db } from "./connection.js";

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
  )
`;

async function initDb() {
  await db.query(createUsersTable);
  console.log("Users table is ready");
}

export default initDb;