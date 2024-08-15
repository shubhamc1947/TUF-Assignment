// components/PrivateRoute/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
