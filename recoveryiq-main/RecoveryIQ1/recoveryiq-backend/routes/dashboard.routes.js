const express = require("express");
const router = express.Router();
const db = require("../db.json");

/* STATS */
router.get("/stats", (req, res) => {
  res.json(db.dashboard);
});

/* TRENDS */
router.get("/trends", (req, res) => {
  res.json({
    dates: ["Jan", "Feb", "Mar"],
    values: [40, 55, 68]
  });
});

/* PRIORITY DISTRIBUTION */
router.get("/priority-distribution", (req, res) => {
  res.json({
    HIGH: 12,
    MEDIUM: 20,
    LOW: 10
  });
});

module.exports = router;
