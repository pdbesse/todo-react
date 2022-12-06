import React from 'react';
import TodoList from '../../components/Todos/TodoList/TodoList';
import TodoForm from '../../components/Todos/TodoForm/TodoForm';
import { Col } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';

export default function Todos() {

  return (
    <Col md={8} className="justify-center">
      <div className="col mb-3 p-3">
        <TodoForm
        />
      </div>
      <div className="col mb-3">
        <TodoList
        />
      </div>
    </Col>
  );
};
