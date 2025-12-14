const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const stationRoutes = require("./routes/stations");
app.use("/stations", stationRoutes); // all /stations routes handled here

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});