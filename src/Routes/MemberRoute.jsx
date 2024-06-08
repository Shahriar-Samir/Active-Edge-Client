import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate } from 'react-router-dom';

const MemberRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    if(user && user.role === 'member'){
        return children
    }
    return <Navigate to='/'></Navigate>
};

export default MemberRoute;