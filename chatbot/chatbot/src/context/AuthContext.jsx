// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // 1. Importa tu cliente

const AuthContext = createContext();

/**
 * useAuth: Hook de conveniencia para consumir el contexto de autenticación.
 * Devuelve el objeto `AuthContext` con el usuario actual, sesión y helpers.
 */
export const useAuth = () => {
    return useContext(AuthContext);
};

/**
 * AuthProvider: Componente proveedor que maneja la autenticación con Supabase.
 * - Mantiene `currentUser`, `session`, y `loading`.
 * - Escucha cambios de autenticación con `supabase.auth.onAuthStateChange`.
 */
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [session, setSession] = useState(null); // Para guardar el token
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Obtiene la sesión la primera vez
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setCurrentUser(session?.user ?? null);
            setLoading(false);
        });

        // Escucha cambios en la autenticación (Login, Logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setCurrentUser(session?.user ?? null);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    // Funciones que le pasamos al resto de la app
    const value = {
        currentUser,
        session, 
        // signIn: inicia sesión usando supabase con credenciales (email, password)
        signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
        // signOut: cierra la sesión actual
        signOut: () => supabase.auth.signOut(),
        // signUp: registra un nuevo usuario con email y password
        signUp: (email, password) => supabase.auth.signUp({ email, password }) // <-- LÍNEA CORREGIDA
    };

    return (
        <AuthContext.Provider  value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};