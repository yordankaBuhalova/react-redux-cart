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
            let data = action.payload

            if (data.endsWith(',')){
                data = data.slice(0, -1)
            }

            let productList = data.split(',');

            let newProduct: Record<string, number> = {};

            for (var i=0; i < productList.length; i=i+2) {
                newProduct[productList[i].trim()] = parseFloat(productList[i+1])
            }

            state.products = newProduct
        },
    },
})

export const { addProducts } = productSlice.actions;

export const getProductsSelector = (state: RootState) => state.products.products;

export default productSlice.reducer;


