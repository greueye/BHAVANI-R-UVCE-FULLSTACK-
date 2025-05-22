import React, { useContext, useState } from 'react';
import TodoContext from '../context/TodoContext';
import TodoItem from './TodoItem';
import Alert from './Alert';

const TodoList = () => {
  const { todos, alert, isLoading, addTodo, deleteTodo, summarizeTodos } = useContext(TodoContext);
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText('');
 };

  return (
    <div className="todo-container">
      <h1>Todo Summary Assistant</h1>
      
      {alert && <Alert message={alert.message} type={alert.type} />}
      
      <form onSubmit={onSubmit} className="todo-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit">Add Todo</button>
</form>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="todo-list">
            {todos.map(todo => (
              <TodoItem key={todo._id} todo={todo} onDelete={deleteTodo} />
            ))}
          </div>
          
          <button 
            onClick={summarizeTodos} 
            className="summarize-btn"
            disabled={todos.length === 0}
>
            Summarize and Send to Slack
          </button>
        </>
      )}
    </div>
  );
};

export default TodoList;
