const express = require("express");
const router = express.Router();
const pool = require("../db"); // your db connection

// GET all charging stations
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM charging_stations ORDER BY id ASC");
    res.json(result.rows);  // return JSON array of all stations
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { station_name, location_address, pin_code, connector_type, status, image_url, location_link } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO charging_stations 
       (station_name, location_address, pin_code, connector_type, status, image_url, location_link)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [station_name, location_address, pin_code, connector_type, status, image_url, location_link]
    );

    res.json(result.rows[0]); // return the inserted record
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE a charging station
// UPDATE a charging station by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const {
    station_name,
    location_address,
    pin_code,
    connector_type,
    status,
    image_url,
    location_link
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE charging_stations
       SET
         station_name = $1,
         location_address = $2,
         pin_code = $3,
         connector_type = $4,
         status = $5,
         image_url = $6,
         location_link = $7
       WHERE id = $8
       RETURNING *`,
      [
        station_name,
        location_address,
        pin_code,
        connector_type,
        status,
        image_url,
        location_link,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Station not found" });
    }

    res.json(result.rows[0]); // updated record
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a charging station by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM charging_stations WHERE id = $1 RETURNING *",
      [id]
    );

    // If no row deleted → invalid ID
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Station not found" });
    }

    res.json({
      message: "Charging station deleted successfully",
      station: result.rows[0]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});




module.exports = router;