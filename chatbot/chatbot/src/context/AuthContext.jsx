// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // 1. Importa tu cliente

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

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
        signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
        signOut: () => supabase.auth.signOut(),
        signUp: (email, password) => supabase.auth.signUp({ email, password }) // <-- LÍNEA CORREGIDA
    };

    return (
        <AuthContext.Provider  value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};