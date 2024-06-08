import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate } from 'react-router-dom';

const TrainerRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    if(user && user.role === 'trainer'){
        return children
    }
    return <Navigate to='/'></Navigate>
};

export default TrainerRoute;