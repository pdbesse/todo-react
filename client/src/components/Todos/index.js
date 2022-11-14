import React from 'react';
import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm/TodoForm';

export default function Todos() {

  return (
    <main>
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
    </main>
  );
};
