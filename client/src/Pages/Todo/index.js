import React from 'react';
import TodoList from '../../components/Todos/TodoList/TodoList';
import TodoForm from '../../components/Todos/TodoForm/TodoForm';
// import { Col } from 'react-bootstrap';
import './index.css'
// import { useParams } from 'react-router-dom';

export default function Todos() {

  return (
    <div className='form-container'>
      <TodoForm
      />
      <TodoList
      />
    </div>
  );
};
