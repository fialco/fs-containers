const express = require('express');
const redis = require('../redis');
const router = express.Router();

/* GET statistics. */
router.get('/', async (_, res) => {
  var added_todos = await redis.get('added_todos');

  if (!added_todos) {
    added_todos = 0;
    await redis.set('added_todos', added_todos);
  }

  res.json({ added_todos: added_todos });
});

module.exports = router;
