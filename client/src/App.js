import React, { useState, useRef, useEffect } from 'react';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Stack } from 'react-bootstrap';
import './App.css';

const LOCAL_STORAGE_KEY = 'todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <div className='form-container'>
        <Row className='align-items-center'>
          <Form className='mx-auto'>
            <div>
              <Form.Group controlId="formTodo">
                <Stack gap={2}>
                  <div className='label'>
                    <Form.Label>Add Todo</Form.Label>
                  </div>
                  <div className='group'>
                    <Form.Control type="text control" placeholder="What do you have to do?" ref={todoNameRef} />
                  </div>
                </Stack>
              </Form.Group>
            </div>
            <Button variant="outline-success" className='button' onClick={handleAddTodo}>Add</Button>
            <Button variant="outline-danger" className='button' size="large" onClick={handleClearTodos}>Clear completed</Button>
            <div>{todos.filter(todo => !todo.complete).length} left to do</div>
          </Form>
        </Row>
        <div className='todolist'>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
      </div>
    </>
  )
}

export default App;
