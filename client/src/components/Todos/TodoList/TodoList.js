import React from 'react'
import { useQuery } from '@apollo/client';
import { QUERY_ALL_TODOS, QUERY_ME } from '../../../utils/queries';
import './TodoList.css'

export default function TodoList() {
    const { todo_loading, todo_data } = useQuery(QUERY_ALL_TODOS);
    const todos = todo_data?.todos || [];
    if (!todos.length) {
        return <h3 className='todos'>No Todos Yet</h3>;
    }

    return (
        <div>
            <h3>Your Todos</h3>
            {todos &&
                todos.map((todo) => (
                    <div key={todo._id} className="card mb-3">
                        <h4 className="card-header bg-primary text-light p-2 m-0">
                            {todo.username} <br />
                            <span style={{ fontSize: '1rem' }}>
                                had this todo on {todo.createdAt}
                            </span>
                        </h4>
                        <div className="card-body bg-light p-2">
                            <p>{todo.todoText}</p>
                        </div>
                    </div>
                ))}
        </div>
    );
};
