import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {
    const {user} = useContext(AuthContext);

    // if user exists, show the page, if not ,redirect to / login
    return user? children:<Navigate to="/login" /> 
}

export default PrivateRoute