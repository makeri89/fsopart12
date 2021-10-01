const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  let prevTodos = await redis.getAsync('added_todos')
  await redis.setAsync('added_todos', Number(prevTodos)+1)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo
  const todoFromDB = await Todo.findById(todo.id)
  res.json(todoFromDB)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const data = req.body
  await Todo.updateOne({ _id: req.todo._id }, { done: data.done })
  res.sendStatus(200)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
