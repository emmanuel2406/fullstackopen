const express = require("express");
const redis = require("../redis");
const router = express.Router();

router.get("/", async (req, res) => {
  const addedTodos = await redis.get("added_todos");
  res.send({ added_todos: parseInt(addedTodos) });
});

module.exports = router;
