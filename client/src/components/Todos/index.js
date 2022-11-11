import React from 'react';
import { useQuery } from '@apollo/client';
import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm/TodoForm';

import { QUERY_ALL_TODOS } from '../../utils/queries';
import Todo from './TodoList/TodoList';

export default function Todos() {
  const { loading, data } = useQuery(QUERY_ALL_TODOS);
  const todos = data?.todos || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <TodoForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TodoList
              todos={todos}
              title="Your todos:"
            />
          )}
        </div>
      </div>
    </main>
  );
};
