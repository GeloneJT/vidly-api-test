const express = require("express");
const router = express.Router();

// HOME endpoint
router.get("/", (req, res) => {
  res.send("Welcome to Vidly API Demo!!!");
});

module.exports = router;
