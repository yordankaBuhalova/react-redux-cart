import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface BasketState {
    cart: Record<string, number>
}

// Define the initial state
const initialState: BasketState = {
    cart: {},
}

export const basketSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<string> ) => {
            if(state.cart[action.payload] == null) {
                state.cart[action.payload] = 1
            } else {
                state.cart[action.payload]++
            }
        },
        removeFromCart: (state, action: PayloadAction<string> ) => {
            if(state.cart[action.payload] == 0) {

                delete state.cart[action.payload]
            }
            if(state.cart[action.payload] > 0) {
                state.cart[action.payload]--
            }
        },
        removeProductFromCart: (state, action: PayloadAction<string> ) => {
            delete state.cart[action.payload]
        },

    },
})

export const { addToCart, removeFromCart, removeProductFromCart } = basketSlice.actions;

export const getBasketSelector = (state: RootState) => state.cart.cart;

export default basketSlice.reducer;


