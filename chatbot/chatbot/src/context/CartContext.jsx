import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; 
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const { session } = useAuth(); 

    // --- 1. LEER CARRITO DE SUPABASE ---
    const fetchCart = async () => {
        if (!session?.user?.id) {
            setCartItems([]);
            return;
        }
        
        setLoading(true);
        try {
            // Consulta usando las columnas correctas de tu base de datos
            const { data, error } = await supabase
                .from('carritoTemporal')
                .select(`
                    idcarrito, 
                    cantidad,
                    idProducto,
                    productos (
                        nombreProducto,
                        precioProducto
                    )
                `)
                .eq('user_id', session.user.id);

            if (error) throw error;

            // Formatear datos para el frontend
            const itemsFormateados = data.map(item => ({
                id: item.idcarrito, 
                idProducto: item.idProducto,
                cantidad: item.cantidad,
                nombreProducto: item.productos?.nombreProducto || 'Producto sin nombre',
                precioUnitario: item.productos?.precioProducto || 0
            }));

            setCartItems(itemsFormateados); 

        } catch (error) {
            console.error("Error cargando carrito:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // --- 2. VACIAR CARRITO ---
    const clearCart = async () => {
        if (!session?.user?.id) return;

        const confirm = window.confirm("¿Estás seguro de que quieres vaciar todo el carrito?");
        if (!confirm) return;

        try {
            const { error } = await supabase
                .from('carritoTemporal')
                .delete()
                .eq('user_id', session.user.id);

            if (error) throw error;
            setCartItems([]); // Limpiar estado local inmediatamente

        } catch (error) {
            console.error("Error al vaciar:", error.message);
        }
    };

    // Efecto para cargar al iniciar sesión
    useEffect(() => {
        fetchCart();
    }, [session]);

    // Efecto Realtime (escuchar cambios en DB)
    useEffect(() => {
        if (!session?.user?.id) return;
        const channel = supabase
            .channel('cambios_carrito_usuario')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'carritoTemporal', filter: `user_id=eq.${session.user.id}` }, () => fetchCart())
            .subscribe();
        return () => { supabase.removeChannel(channel); };
    }, [session]);

    const value = {
        cartItems,
        fetchCart,
        clearCart,
        isCartOpen,
        loading,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen(!isCartOpen)
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};