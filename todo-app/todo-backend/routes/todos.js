const express = require('express');
const redis = require('../redis');
const { Todo } = require('../mongo');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  var added_todos = await redis.get('added_todos');

  if (!added_todos) {
    added_todos = 0;
  }

  added_todos++;
  await redis.set('added_todos', added_todos);

  res.status(200).json(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(204);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const update = await Todo.findOneAndUpdate(
    { _id: req.todo._id },
    {
      $set: { text: req.body.text, done: req.body.done },
    },
    { returnDocument: 'after' },
  );

  res.status(200).json(update);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
