import React from 'react';
import { useCart } from '../context/CartContext.jsx';

/**
 * CartModal: Sidebar que muestra los artículos del carrito y acciones como
 * vaciar carrito o proceder al pago. Se muestra/oculta según `isCartOpen`.
 */
export default function CartModal() {
    // Extraemos las funciones y estados del contexto
    const { cartItems, isCartOpen, closeCart, loading, clearCart } = useCart();

    // Si no está abierto, no renderizamos nada
    if (!isCartOpen) return null;

    // Cálculo del total (suma de precioUnitario * cantidad)
    const total = cartItems.reduce((sum, it) => sum + (Number(it.precioUnitario || 0) * Number(it.cantidad || 0)), 0);

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Overlay oscuro con efecto blur */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={closeCart}
            ></div>

            {/* Contenedor del Sidebar */}
            <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                
                {/* --- HEADER --- */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Tu Carrito ({cartItems.length})</h2>
                    <button 
                        onClick={closeCart}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                        {/* Icono X (SVG) */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* --- BODY (Lista Scrollable) --- */}
                <div className="flex-1 overflow-y-auto p-5">
                    {loading ? (
                        <div className="flex justify-center items-center h-32 text-gray-500">
                            <span className="loading-spinner">Cargando...</span>
                        </div>
                    ) : cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            <p>Tu carrito está vacío.</p>
                            <button onClick={closeCart} className="text-indigo-600 font-medium hover:underline">
                                Seguir comprando
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item, index) => (
                                <li key={item.id || index} className="flex justify-between items-start bg-gray-50 p-3 rounded-lg group hover:bg-gray-100 transition-colors">
                                    <div className="flex-1 pr-4">
                                        <h3 className="font-semibold text-gray-800 line-clamp-2">{item.nombreProducto}</h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            <span className="font-medium text-gray-900">{item.cantidad}</span> x ${Number(item.precioUnitario).toLocaleString('es-CL')}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-gray-900">
                                            ${(Number(item.precioUnitario || 0) * Number(item.cantidad || 0)).toLocaleString('es-CL')}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* --- FOOTER (Acciones) --- */}
                {cartItems.length > 0 && (
                    <div className="p-5 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 text-lg">Total estimado</span>
                            <span className="text-2xl font-bold text-gray-900">${total.toLocaleString('es-CL')}</span>
                        </div>
                        
                        <div className="space-y-3">
                            <button className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition-all transform active:scale-[0.98]">
                                Ir a Pagar
                            </button>
                            
                            <button 
                                onClick={clearCart}
                                className="w-full py-2.5 px-4 text-red-500 hover:bg-red-50 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                Vaciar carrito
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}