const express = require("express");
const router = express.Router();
const db = require("../db.json");

/* CASE LIST */
router.get("/", (req, res) => {
  res.json({
    data: db.cases,
    total: db.cases.length
  });
});

/* CASE DETAIL */
router.get("/:id", (req, res) => {
  const found = db.cases.find(c => c.id === req.params.id);
  res.json(found);
});

/* UPDATE STATUS */
router.patch("/:id/status", (req, res) => {
  res.json({ message: "Case status updated" });
});

module.exports = router;
