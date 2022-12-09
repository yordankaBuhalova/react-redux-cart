import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface ProductState {
    products: Record<string, number>
}


const initialState: ProductState = {
    products: {},
}

export const productSlice = createSlice({
    name: 'product',

    initialState,
    reducers: {
        addProducts: (state, action: PayloadAction<string> ) => {
            let productList = action.payload.split(',');

            let myRecord: Record<string, number> = {};

            for (var i=0; i < productList.length; i=i+2) {
                myRecord[productList[i].trim()] = parseFloat(productList[i+1])
            }

            state.products = myRecord
        },
    },
})

export const { addProducts } = productSlice.actions;

export const getProductsSelector = (state: RootState) => state.products.products;

export default productSlice.reducer;


