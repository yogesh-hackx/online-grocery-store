import React, { useState, createContext } from 'react';

const CartContext = createContext();

export default CartContext;

export function CartContextProvider({ children }) {
    const [cart, setCart] = useState([]);

    const value = React.useMemo(() => ({
        cart, setCart,
    }), [cart]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}