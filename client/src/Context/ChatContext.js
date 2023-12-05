import { createContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({children}) {
    const [chatName, setChatName] = useState('');


    return (
        <CartContext.Provider value={{
            chatName,
            setChatName,
        }}>
        {children}
        </CartContext.Provider>
    )
}

export default CartContext;

