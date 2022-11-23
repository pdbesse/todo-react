import React from 'react';
import './App.css';
import Auth from "./utils/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { UserProvider } from './utils/userContext';
import Header from "./components/Header/Header";
// import Background from "./components/Background/Background";
import LandingPage from "./Pages/LandingPage/LandingPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignUp from "./Pages/SignUp/SignUp";
// import Sidebar from "./components/Sidebar/Sidebar";
import Todo from './Pages/Todo/index';
import Loader from "./components/Loader/Loader";
import Profile from "./Pages/Profile/Profile";
import Sidebar from './components/Sidebar/Sidebar';
import MediaQuery from "react-responsive";
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

const renderPages = () => {};
function App() {

  return (
    <ApolloProvider client={client}>
      {/* <UserProvider> */}
        {/* <Background> */}
          <Header />
          {Auth.loggedIn() && (
            <MediaQuery maxWidth={2000}>
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
                { }
                <MediaQuery minWidth={2000}>
                  <Col md={1}>
                    <Sidebar />
                  </Col>
                </MediaQuery>
                <Col md={11}>
                  {" "}
                  <BrowserRouter>
                    <Routes>
                      <Route path="/todo" element={<Todo />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/profiles/:_id" element={<Profile />} />
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
        {/* </Background> */}
      {/* </UserProvider> */}
    </ApolloProvider >
  )
};

export default App;
