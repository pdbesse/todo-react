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
                    <div key={todo._id}>
                        <div>
                            <p>{todo.todoText} || {todo.createdAt}</p>
                        </div>
                    </div>
                ))}
        </div>
    );
};
