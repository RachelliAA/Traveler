const express = require("express");
const { Client } = require("pg");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "5qZ3uV5g",
  port: 5432,
});

client.connect();
client.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Database connected successfully:", result.rows);
  }
});
app.use(express.json());
createTables();

app.post("/user", async (req, res) => {
  const { id,
    name,
    phone_number,
    email,
    password,
    is_admin } = req.body;
  const query = `
    INSERT INTO users (id, name, phone_number, email, password, is_admin)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `;
  client.query(
    query,
    [id, name, phone_number, email, password, is_admin],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Server error");
      } else {
        res.status(201).json(result.rows[0]);
      }
    }
  );
});

app.get("/user", (req, res) => {
  const query = "SELECT * FROM users";
  client.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.status(200).json(result.rows);
    }
  });
});



async function createTables() {
  try {
    await client.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    phone_number VARCHAR(20),
    email VARCHAR(100),
    password VARCHAR(100),
    is_admin BOOLEAN
  );
`);

    await client.query(`
  CREATE TABLE IF NOT EXISTS trips (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description VARCHAR(100),
    admin_id INTEGER REFERENCES users(id),
    max_tickets INTEGER,
    price NUMERIC
  );
`);

    await client.query(`
  CREATE TABLE IF NOT EXISTS user_trips (
    user_id INTEGER REFERENCES users(id),
    trip_id INTEGER REFERENCES trips(id),
    PRIMARY KEY (user_id, trip_id)
  );
`);

    console.log("Tables ensured.");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
