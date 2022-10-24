import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';

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
      <Row className='container'>
        <Form className='mx-auto col-6 align-self-center border-1'>
          <div>
            <Form.Group className='mb-3' controlId="formTodo">
              <Form.Label className='m-5'>Add Todo</Form.Label>
              <Form.Control type="text" placeholder="What do you have to do?" ref={todoNameRef} />
            </Form.Group>
          </div>
          <Button className='btn btn-primary' onClick={handleAddTodo}>Add</Button>
          <Button onClick={handleClearTodos}>Clear completed</Button>
          <div>{todos.filter(todo => !todo.complete).length} left to do</div>
        </Form>
      </Row>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </>
  )
}

export default App;
