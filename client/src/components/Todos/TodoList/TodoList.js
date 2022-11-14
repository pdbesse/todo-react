import React from 'react'
import { useQuery } from '@apollo/client';
import { QUERY_MY_TODOS } from '../../../utils/queries';
import Auth from '../../../utils/auth';
import './TodoList.css'

export default function TodoList() {
    const { loading: todo_loading, data: todo_data } = useQuery(QUERY_MY_TODOS, {
        variables: { username: Auth.getProfile().data.username }
    });
    const todos = todo_data?.todos || [];
    // console.log(todo_data)

    if (todo_loading) {
        return <h3>Loading...</h3>;
    }

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
