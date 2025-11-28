// src/components/ProtectedRoute.jsx
import React from 'react';
/**
 * ProtectedRoute: Componente que protege rutas y redirige a la página de
 * inicio si no hay usuario autenticado.
 */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute: Componente que protege rutas de React Router. Si no hay usuario
 * autenticado redirige a la página principal, de lo contrario renderiza `children`.
 */
const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        // Si no hay usuario, redirige a la página de inicio de sesión
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;