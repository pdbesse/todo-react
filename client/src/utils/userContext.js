import React, { createContext, useContext } from 'react';
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';

const loggedUserContext = createContext();

export const useUserContext = () => useContext(loggedUserContext);

export const UserProvider = ({ children }) => {
    const { loading, data } = useQuery(QUERY_ME);
    const username = data?.me?.username;
    // console.log(username)

    return (
        <loggedUserContext.Provider value = {{username}}>
            {children}
        </loggedUserContext.Provider>
    );
};