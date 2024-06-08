import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Components/Loading';

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation()
    console.log(location)

    if(loading){
        return <Loading/>
    }
    if(user){
        return children
    }
    return <Navigate to='/login' state={{location}}></Navigate>
};

export default PrivateRoute;