const Todo = require('../models/todo');

// @route   GET api/todos
// @desc    Get all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ date: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
// @route   POST api/todos
// @desc    Add new todo
exports.addTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      completed: false
    });

    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   DELETE api/todos/:id
// @desc    Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    await todo.remove();
    res.json({ msg: 'Todo removed' });
  } catch (err) {
console.error(err.message);
    res.status(500).send('Server Error');
  }
};
