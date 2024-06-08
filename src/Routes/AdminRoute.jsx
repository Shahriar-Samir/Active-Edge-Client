import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    if(user && user?.role === 'admin'){
        return children
    }

    return <Navigate to='/'></Navigate>
};

export default AdminRoute;