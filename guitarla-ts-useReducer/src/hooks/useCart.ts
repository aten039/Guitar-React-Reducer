import { useState, useEffect, useMemo } from 'react'
import type { CartItem } from '../types'

export const useCart = () => {

    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [cart, setCart] = useState(initialCart)


   
    return {
        
        cart
    }
}