const express = require("express");
const router = express.Router();
const db = require("../db.json");

/* LOGIN */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = db.users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    token: "fake-jwt-token",
    user
  });
});

/* SESSION */
router.get("/me", (req, res) => {
  res.json(db.users[0]);
});

module.exports = router;
