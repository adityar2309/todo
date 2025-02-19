import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [todos, setTodos] = React.useState([]);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetchTodos();
    }, []);

    const showError = (message) => {
        setError(message);
        setTimeout(() => setError(null), 3000);
    };

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/v1/todos');
            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            showError('Error loading todos');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/v1/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    title: title.trim(), 
                    description: description.trim() 
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to add todo');
            }

            setTitle('');
            setDescription('');
            fetchTodos();
        } catch (error) {
            showError(error.message);
            console.error('Error:', error);
        }
    };

    const toggleTodo = async (id, completed) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: !completed }),
            });

            if (!response.ok) {
                throw new Error('Failed to update todo');
            }

            fetchTodos();
        } catch (error) {
            showError('Error updating todo');
            console.error('Error:', error);
        }
    };

    const deleteTodo = async (id) => {
        if (!window.confirm('Are you sure you want to delete this todo?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/v1/todos/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete todo');
            }

            fetchTodos();
        } catch (error) {
            showError('Error deleting todo');
            console.error('Error:', error);
        }
    };

    return (
        <div className="todo-app">
            <h1>Todo List</h1>
            
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <form onSubmit={addTodo} className="todo-form">
                <div className="form-group">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Todo title"
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description (optional)"
                        className="form-input"
                    />
                </div>
                <button type="submit" className="btn-submit">Add Todo</button>
            </form>

            {loading ? (
                <div className="loading">Loading todos...</div>
            ) : (
                <div className="todo-list">
                    {todos.length === 0 ? (
                        <div className="no-todos">No todos yet. Add one above!</div>
                    ) : (
                        todos.map((todo) => (
                            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id, todo.completed)}
                                    className="todo-checkbox"
                                />
                                <div className="todo-content">
                                    <h3>{todo.title}</h3>
                                    {todo.description && <p>{todo.description}</p>}
                                    <small>Created: {new Date(todo.created_at).toLocaleString()}</small>
                                </div>
                                <button 
                                    onClick={() => deleteTodo(todo.id)}
                                    className="btn-delete"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default App;