import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const CrossRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    if(user && user.role !== 'member'){
        return children
    }
    return <Navigate to='/'></Navigate>
};

export default CrossRoute;