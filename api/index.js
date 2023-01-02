const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Connect to the database
const db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

// Initialize the products table
db.serialize(() => {
  db.run(
    "CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, picture TEXT)"
  );
});

// Set up the routes
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    res.json(rows);
  });
});

app.post("/api/products", (req, res) => {
  const { name, price, picture } = req.body;
  db.run(
    "INSERT   INTO products (name, price, picture) VALUES (?, ?, ?)",
    name,
    price,
    picture,
    (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        db.get(
          "SELECT * FROM products WHERE id = last_insert_rowid()",
          (err, row) => {
            res.json(row);
          }
        );
      }
    }
  );
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, picture } = req.body;
  db.run(
    "UPDATE products SET name = ?, price = ?, picture = ? WHERE id = ?",
    name,
    price,
    picture,
    id,
    (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        db.get("SELECT * FROM products WHERE id = ?", id, (err, row) => {
          res.json(row);
        });
      }
    }
  );
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM products WHERE id = ?", id, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
