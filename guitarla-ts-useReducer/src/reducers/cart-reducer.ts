import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

export type CartAction = 
{ type: 'add-tocart', payload: {item:Guitar} } |
{ type: 'remove-fromcart', payload: {id: Guitar['id']}} |
{ type: 'decrease-quantity', payload: {id: Guitar['id']}} |
{ type: 'increase-quantity', payload: {id: Guitar['id']}} |
{ type: 'clear-cart'}

export type CartState = {
    data: Guitar[],
    cart: CartItem[]
}

const initialCart = ()=>{
    const cartStorage  = localStorage.getItem('cart');
    return cartStorage? JSON.parse(cartStorage):[]
}

export const initialState : CartState = {
    data: db,
    cart: initialCart()
}
const MIN_ITEMS = 1
const MAX_ITEMS = 5

export const cartReducer = ( state:CartState = initialState , actions: CartAction)=>{


    if( actions.type === 'add-tocart'){
       

        const itemExists = state.cart.find(guitar => guitar.id === actions.payload.item.id);

        let updatedCart : CartItem[] =[]

        if(itemExists ) { // existe en el carrito
            updatedCart = state.cart.map(item => {
                if(item.id === actions.payload.item.id){
                    if(item.quantity < MAX_ITEMS){
                        return { ...item, quantity:item.quantity+1}
                    }else{
                        return item
                    }

                }else {
                    return item
                }
            })

        } else { 
            
            const newItem : CartItem = {...actions.payload.item, quantity : 1}
            
            updatedCart = [
                ...state.cart,
                newItem
            ]
        }
        return{
            ...state,
            cart: updatedCart
        }
    }

    if( actions.type === 'remove-fromcart'){
        
        const updatedCart = state.cart.filter((activity)=> activity.id !== actions.payload.id )

        return{
            ...state,
            cart: updatedCart
        }
    }

    if(actions.type === 'decrease-quantity'){
        const updatedCart = state.cart.map( item => {
            if(item.id === actions.payload.id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        return{
            ...state,
            cart: updatedCart
        }
    }

    if(actions.type ==='increase-quantity'){
        const updatedCart = state.cart.map( item => {
            if(item.id === actions.payload.id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        return{
            ...state,
            cart:updatedCart
        }
    }

    if(actions.type ==='clear-cart'){

        return{
            ...state,
            cart: []
        }
    }

    return state

}
