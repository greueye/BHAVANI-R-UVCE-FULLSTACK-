import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Set alert
  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };
// Get all todos
  const getTodos = async () => {
    try {
      const { data } = await api.get('/todos');
      setTodos(data);
      setIsLoading(false);
    } catch (err) {
      showAlert('Error fetching todos', 'error');
      setIsLoading(false);
    }
  };
 // Add todo
  const addTodo = async (text) => {
    try {
      const { data } = await api.post('/todos', { text });
      setTodos([data, ...todos]);
      showAlert('Todo added', 'success');
    } catch (err) {
      showAlert('Error adding todo', 'error');
    }
  };
// Delete todo
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
      showAlert('Todo removed', 'success');
    } catch (err) {
      showAlert('Error removing todo', 'error');
    }
  };
 // Summarize todos
  const summarizeTodos = async () => {
    try {
      const { data } = await api.post('/summarize');
      showAlert(data.msg, 'success');
    } catch (err) {
      showAlert(err.response?.data?.msg || 'Error summarizing todos', 'error');
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
return (
    <TodoContext.Provider
      value={{
        todos,
        alert,
        isLoading,
        addTodo,
        deleteTodo,
        summarizeTodos,
        showAlert
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
export default TodoContext;
