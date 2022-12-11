import reducer, {ProductState, addProducts} from '../productSlice'

test('when starting the reducer, empty products should be set', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({products: {}})
})

test('when addProducts with the correct input is called, a new product should be added', () => {
    const previousState : ProductState = {products:{}}
    expect(reducer(previousState, addProducts("testProduct, 2"))).toEqual({products: {
        testProduct: 2
    }})
})