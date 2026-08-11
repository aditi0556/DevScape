import mysql from "mysql";

const db = mysql.createPool({
    host: "mysql-devscape",
    user: "root",
    password: "password",
    database: "mydb",
    connectionLimit: 10,
    waitForConnections: true,
});
function waitForDb(retries = 10) {
    db.query("SELECT 1", (err) => {
        if (err) {
            if (retries === 0) {
                console.error("Could not reach database, giving up.");
                return;
            }
            console.error("DB not ready yet, retrying in 5s...", err.code);
            setTimeout(() => waitForDb(retries - 1), 5000);
        } else {
            console.log("Connected to database successfully!");
        }
    });
}
waitForDb();

export default db;