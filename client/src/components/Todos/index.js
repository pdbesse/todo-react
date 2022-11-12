import React from 'react';
import { useQuery } from '@apollo/client';
import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm/TodoForm';

import { QUERY_ALL_TODOS, QUERY_ME } from '../../utils/queries';
// import Todo from './TodoList/TodoList';

export default function Todos() {
  const { todo_loading, todo_data } = useQuery(QUERY_ALL_TODOS);
  const todos = todo_data?.todos || [];

  const { loading: me_loading, data: me_data } = useQuery(QUERY_ME);
  const me_username = me_data?.me?.username;
  console.log(me_username);

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <TodoForm
          username={me_username} />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {todo_loading ? (
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
