import React, { useState, useRef } from 'react';
// import { useUserContext } from '../../../utils/userContext';
import { useMutation, useQuery } from '@apollo/client';
import {
    ADD_TODO,
    // REMOVE_TODO
} from '../../../utils/mutations';
import { QUERY_ME } from '../../../utils/queries';
import Loader from '../../Loader/Loader';
import { Row, Stack, Form, Button } from 'react-bootstrap';
// import './TodoForm.css';

export default function TodoList(
    // { me_username }
    ) {
        const [addToDo, { error }] = useMutation(ADD_TODO);
    // const { username } = useUserContext;

    const { loading, data } = useQuery(QUERY_ME);
    const username = data?.me?.username;
    console.log(username);

    // if (loading) {
    //     return <h3>Loading...</h3>;
    // }

    const [todoState, setToDoState] = useState({
        todoText: '',
        username: `${username}`
    });
    console.log(todoState)

    // const [removeToDo, {removeError}] = useMutation(REMOVE_TODO);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = addToDo({
                variables: { ...todoState }
            });
            // console.log(data)
        } catch (err) {
            console.error(err);
        }

        setToDoState({
            todoText: ''
        })
        // window.location.reload();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'todoText') {
            setToDoState({ ...todoState, todoText: value, username: username });
        }
    };
    if (loading) {
        return <h3>Loading...</h3>;
    } else {
    return (
        <div className='todoContainer'>
            <Row className='align-items-center'>
                <Form className='mx-auto' onSubmit={handleFormSubmit}>
                    <div>
                        <Form.Group controlId="formTodo">
                            <Stack gap={2}>
                                <div className='label todos'>
                                    <Form.Label>Add Todo</Form.Label>
                                </div>
                                <div className='group'>
                                    <Form.Control type="text control" placeholder="What do you have to do?" name='todoText'
                                        onChange={handleChange} />
                                </div>
                            </Stack>
                        </Form.Group>
                    </div>
                    <Button variant="outline-success" className='button' type='submit'>Add</Button>
                </Form>
                <Button variant="outline-danger" className='button' size="large"
                // onClick={handleClearTodos}
                >Clear completed</Button>
            </Row>
        </div>
    )
}
    };


  // const LOCAL_STORAGE_KEY = 'todos';

    // const [todos, setTodos] = useState([]);
    // const todoNameRef = useRef();

    // useEffect(() => {
    //     const storedTodos = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))
    //     if (storedTodos) setTodos(storedTodos)
    // }, []);

    // useEffect(() => {
    //     window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    // }, [todos]);

    // function toggleTodo(id) {
    //     const newTodos = [...todos];
    //     const todo = newTodos.find(todo => todo.id === id);
    //     todo.complete = !todo.complete;
    //     setTodos(newTodos);
    // }

    // function handleAddTodo(e) {
    //     const name = todoNameRef.current.value
    //     if (name === '') return;
    //     setTodos(prevTodos => {
    //         return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    //     })
    //     todoNameRef.current.value = null;
    // }

    // function handleClearTodos() {
    //     const newTodos = todos.filter(todo => !todo.complete);
    //     setTodos(newTodos);
    // }