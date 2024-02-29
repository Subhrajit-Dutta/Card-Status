const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const pgp = require("pg-promise")();
const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.DATABASE_URL;

const sslOptions = {
  rejectUnauthorized: false,
};

const db = pgp({
  connectionString,
  ssl: process.env.NODE_ENV === "production" ? sslOptions : false,
});

const app = express();

app.use(express.json());

const createUserTable = async () => {
  try {
    await db.none(
      "CREATE TABLE IF NOT EXISTS card_status (card_id VARCHAR(255) PRIMARY KEY, user_mobile VARCHAR(255), status VARCHAR(255), comment TEXT);"
    );
    console.log("User table created successfully");
  } catch (error) {
    console.error("Error creating user table:", error.message || error);
    throw error;
  }
};

async function parseCSVFiles() {
  try {
    const csvFiles = [
      "data/Sample Card Status Info - Pickup.csv",
      "data/Sample Card Status Info - Delivery exceptions.csv",
      "data/Sample Card Status Info - Delivered.csv",
      "data/Sample Card Status Info - Returned.csv",
    ];

    for (const file of csvFiles) {
      await new Promise((resolve, reject) => {
        fs.createReadStream(file)
          .pipe(csv())
          .on("data", async (row) => {
            try {
              const existingRow = await db.oneOrNone(
                "SELECT * FROM card_status WHERE card_id = $1",
                [row["Card ID"]]
              );
              if (existingRow) {
                if (row["Comment"]) {
                  await db.query(
                    "UPDATE card_status SET comment = $1 WHERE card_id = $2",
                    [row["Comment"], row["Card ID"]]
                  );
                  console.log(
                    `Comment added for Card ID ${row["Card ID"]} from ${file}`
                  );
                } else {
                  console.log(
                    `Card ID ${row["Card ID"]} already exists, skipping insertion for ${file}`
                  );
                }
              } else {
                const { card_id, ...data } = row;
                const columns = Object.keys(data).join(", ");
                const values = Object.values(data)
                  .map((value) => `'${value}'`)
                  .join(", ");
                await db.query(
                  `INSERT INTO card_status (card_id, ${columns}) VALUES ($1, ${values})`,
                  [row["Card ID"]]
                );
              }
            } catch (error) {
              console.error("Error processing row:", error);
            }
          })
          .on("end", () => {
            console.log(`${file} processed`);
            resolve();
          })
          .on("error", (error) => {
            console.error(`Error processing ${file}:`, error);
            reject(error);
          });
      });
    }
  } catch (error) {
    console.error("Error parsing CSV files:", error);
    throw error;
  }
}

app.get("/get_card_status", async (req, res) => {
  const { phone_number, card_id } = req.query;
  try {
    let queryResult;
    if (phone_number) {
      queryResult = await db.any(
        "SELECT * FROM card_status WHERE user_mobile = $1",
        [phone_number]
      );
    } else if (card_id) {
      queryResult = await db.any(
        "SELECT * FROM card_status WHERE card_id = $1",
        [card_id]
      );
    } else {
      return res
        .status(400)
        .json({ error: "Phone number or card ID is required" });
    }
    res.json(queryResult);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function initializeServer() {
  try {
    await createUserTable();
    await parseCSVFiles();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
}

initializeServer();
