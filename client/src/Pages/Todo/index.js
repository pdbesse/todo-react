import React from 'react';
import TodoList from '../../components/Todos/TodoList/TodoList';
import TodoForm from '../../components/Todos/TodoForm/TodoForm';
// import { useParams } from 'react-router-dom';

export default function Todos() {

  return (
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <TodoForm
          />
        </div>
        <div className="col-12 col-md-8 mb-3">
            <TodoList
            />
        </div>
      </div>
  );
};
