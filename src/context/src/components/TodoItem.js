import React from 'react';

const TodoItem = ({ todo, onDelete }) => {
  return (
    <div className="todo-item">
      <div className="todo-text">{todo.text}</div>
      <button 
        onClick={() => onDelete(todo._id)} 
        className="delete-btn"
      >
        Delete
      </button>
    </div>
  );
};
export default TodoItem;
