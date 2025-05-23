const express = require('express');
const router = express.Router();
const {
  getTodos,
  addTodo,
  deleteTodo
} = require('../controllers/todos');
const { summarizeTodos } = require('../controllers/summarize');

router.get('/todos', getTodos);
router.post('/todos', addTodo);
router.delete('/todos/:id', deleteTodo);
router.post('/summarize', summarizeTodos);
module.exports = router;
