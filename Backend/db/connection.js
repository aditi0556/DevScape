import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "devscape-mysql",
  user: "root",
  password: "password",
  database: "mydb",
  connectionLimit: 10,
  waitForConnections: true,
});

async function waitForDb(retries = 10, delay = 5000) {
  while (retries > 0) {
    try {
      await db.query("SELECT 1");
      console.log("Connected to database successfully!");
      return;
    } catch (err) {
      console.error("DB not ready yet, retrying in 5s...", err.code);
      retries--;
      if (retries === 0) {
        throw new Error("Could not reach database, giving up.");
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

export { db, waitForDb };