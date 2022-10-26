import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import Auth from "./utils/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Background from "./components/Background/Background";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUp from "./components/SignUp/SignUp";
import Sidebar from "./components/Sidebar/Sidebar";
import TodoList from './components/TodoList/TodoList';
import Loader from "./components/Loader/Loader";
import Profile from "./components/Profile/Profile";
import MediaQuery from "react-responsive";
import { v4 as uuidv4 } from 'uuid';
import { Col, Row } from 'react-bootstrap';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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
    <ApolloProvider client={client}>
      <Background>
        <Header />
        {Auth.loggedIn() && (
          <MediaQuery maxWidth={1224}>
            <Row>
              {' '}
              <Sidebar />
            </Row>
          </MediaQuery>
        )}
        <Row className="center">
          {Auth.loggedIn() ? (
            <>
              {" "}
              {}
              <MediaQuery minWidth={1224}>
                <Col md={1}>
                  <Sidebar />
                </Col>
              </MediaQuery>
              <Col md={11}>
                {" "}
                <BrowserRouter>
                  <Routes>
                    <Route path="/todo" element={<TodoList />} />
                    <Route path="/profile" element={<Profile />} />
                    {/* <Route path="/profiles/:_id" element={<Profile />} /> */}
                  </Routes>
                </BrowserRouter>
              </Col>
            </>
          ) : (
            <BrowserRouter>
              <Routes>
                <Route path="/profile" element={<Loader />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<LoginPage />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </BrowserRouter>
          )}
        </Row>
      </Background>
    </ApolloProvider>
  )


  // return (
  //   <>
  //     <div className='form-container'>
  //       <Row className='align-items-center'>
  //         <Form className='mx-auto'>
  //           <div>
  //             <Form.Group controlId="formTodo">
  //               <Stack gap={2}>
  //                 <div className='label'>
  //                   <Form.Label>Add Todo</Form.Label>
  //                 </div>
  //                 <div className='group'>
  //                   <Form.Control type="text control" placeholder="What do you have to do?" ref={todoNameRef} />
  //                 </div>
  //               </Stack>
  //             </Form.Group>
  //           </div>
  //           <Button variant="outline-success" className='button' onClick={handleAddTodo}>Add</Button>
  //           <Button variant="outline-danger" className='button' size="large" onClick={handleClearTodos}>Clear completed</Button>
  //           <div>{todos.filter(todo => !todo.complete).length} left to do</div>
  //         </Form>
  //       </Row>
  //       <div className='todolist'>
  //         <TodoList todos={todos} toggleTodo={toggleTodo} />
  //       </div>
  //     </div>
  //   </>
  // )
}

export default App;
