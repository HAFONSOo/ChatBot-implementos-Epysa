// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid'; // Asegúrate de tenerlo instalado (npm install nanoid)

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [sessionId, setSessionId] = useState(null);

    // 1. Genera el Session ID una sola vez
    useEffect(() => {
        const id = nanoid();
        setSessionId(id);
    }, []); // Se ejecuta solo una vez

    // 2. Función para LEER el carro desde n8n
    const fetchCart = async (currentSessionId) => {
        if (!currentSessionId) return;
        
        try {
            // Este es tu webhook "Get a row"
            const response = await fetch('http://localhost:5678/webhook-test/80a5663d-7186-4f19-8b15-316f7aac4965', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId: currentSessionId })
            });
            if (!response.ok) { // Manejo de error si el webhook falla
                 console.error("Error del webhook:", response.statusText);
                 setCartItems([]);
                 return;
            }
            const items = await response.json();
            
            // --- CAMBIO CLAVE ---
            // El nodo "Get a row" devuelve un array simple.
            setCartItems(items || []); 
        } catch (error) {
            console.error("Error al cargar el carro:", error);
        }
    };

    // 3. El valor que compartiremos
    const value = {
        cartItems,
        fetchCart,
        sessionId // <-- Hacemos que el sessionId esté disponible para el chat
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};