import React from 'react'
import './TodoList.css'

export default function TodoList({ todos, title }) {
    if (!todos.length) {
        return <h3 className='todos'>No Todos Yet</h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
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
