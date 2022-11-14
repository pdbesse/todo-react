import React, { useState } from 'react';
// import { useUserContext } from '../../../utils/userContext';
import { useMutation } from '@apollo/client';
import {
    ADD_TODO,
    // REMOVE_TODO
} from '../../../utils/mutations';
import { QUERY_ME, QUERY_MY_TODOS } from '../../../utils/queries';
// import Loader from '../../Loader/Loader';
import { Row, Stack, Form, Button } from 'react-bootstrap';
import Auth from '../../../utils/auth';
// import './TodoForm.css';

export default function TodoList() {
    const [addToDo, { error }] = useMutation(ADD_TODO
        , {
            update(cache, { data: { addToDo } }) {
                try {
                    const { todos } = cache.readQuery({
                        query: QUERY_MY_TODOS,
                        variables: {
                            username: Auth.getProfile().data.username
                        }
                    });

                    cache.writeQuery({
                        query: QUERY_MY_TODOS,
                        data: { todos: [addToDo, ...todos] },
                    });
                    // console.log({todos})
                } catch (e) {
                    console.error(e);
                }

                // update me object's cache
                const { me } = cache.readQuery({ query: QUERY_ME });
                console.log({ me })
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, todos: [...me.todos, addToDo] } },
                });
            },
        }
    );

    // const { loading, data } = useQuery(QUERY_ME);
    // const username = data?.me?.username;
    // console.log(username);

    const [todoText, setTodoText] = useState({
        todoText: '',
    });
    // console.log(todoText, Auth.getProfile().data.username)

    // const [removeToDo, {removeError}] = useMutation(REMOVE_TODO);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = addToDo({
                variables: {
                    todoText,
                    username: Auth.getProfile().data.username
                }
            });
            // console.log(Auth.getProfile().data.username)

            setTodoText({
                todoText: ''
            })
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'todoText') {
            setTodoText(value);
            // setTodoText({ ...todoState, todoText: value, username: username });
        }
    };

    // if (loading) {
    //     return <h3>Loading...</h3>;
    // } else {
    return (
        <div>
            {Auth.loggedIn() ? (
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
            ) : (
                <p>Please Login</p>
            )
            }
        </div>
    )
}
// };


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