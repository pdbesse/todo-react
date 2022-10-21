import React from 'react'

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    return (
        <div className="bg-black-alt font-sans leading-normal tracking-normal">
            <label>
                <input type='checkbox' checked={todo.complete} onChange={handleTodoClick} />
                {todo.name}
            </label>
        </div>
    )
}
