/** @jest-environment jsdom */
import { fireEvent, render } from "@testing-library/react";
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import { Product } from "../Product";

// Define some test constants
const validInput = "apple, 3, orange, 1.2"
const validProductList = {apple: 3, orange: 1.2}
const buttonRegex = /Submit/i
const textareaRegex = /Add product/i
const renderComponent =  () => render(
        <Provider store={store}>
            <Product/>
        </Provider>
    );

test('all product parts are rendered', () => {
    const { getByText, getByLabelText } = renderComponent()

    expect(getByText(/Add Product List/i)).toBeTruthy();
    expect(getByLabelText(textareaRegex)).toBeTruthy();
    expect(getByText(buttonRegex)).toBeTruthy();
});

test('given correct input, product list is updated', () => {
    const { getByText, getByLabelText } = renderComponent()

    const productTextarea = getByLabelText(textareaRegex)
    const submitButton = getByText(buttonRegex)

    fireEvent.change(productTextarea, { target: {value: validInput} })
    fireEvent.click(submitButton)

    expect(productTextarea.textContent).toContain(validInput)
    expect(store.getState().products.products).toEqual(validProductList)
})

describe('given incorrect input', () => {
    test('with special characters, product list is not updated', () => {
        const { getByText, getByLabelText } = renderComponent()

        const productTextarea = getByLabelText(textareaRegex)
        const submitButton = getByText(buttonRegex)
        const input = "@pple, 3, or@nge, 1.2"

        fireEvent.change(productTextarea, { target: {value: input} })
        fireEvent.click(submitButton)

        expect(productTextarea.textContent).toContain(input)
        expect(store.getState().products.products).toEqual(validProductList)
    })

    test('with uneven amount of elements, product list is not updated', () => {
        const { getByText, getByLabelText } = renderComponent()

        const productTextarea = getByLabelText(textareaRegex)
        const submitButton = getByText(buttonRegex)
        const input = "apple, 3, orange, 1, invalid"

        fireEvent.change(productTextarea, { target: {value: input} })
        fireEvent.click(submitButton)

        expect(productTextarea.textContent).toContain(input)
        expect(store.getState().products.products).toEqual(validProductList)
    })

    test('with a product without a price, product list is not updated', () => {
        const { getByText, getByLabelText } = renderComponent()

        const productTextarea = getByLabelText(textareaRegex)
        const submitButton = getByText(buttonRegex)
        const input = "apple, 3, orange, banana, 1.2, strawberry"

        fireEvent.change(productTextarea, { target: {value: input} })
        fireEvent.click(submitButton)

        expect(productTextarea.textContent).toContain(input)
        expect(store.getState().products.products).toEqual(validProductList)
    })

    test('with non-numbers as prices, product list is not updated', () => {
        const { getByText, getByLabelText } = renderComponent()

        const productTextarea = getByLabelText(textareaRegex)
        const submitButton = getByText(buttonRegex)
        const input = "apple, 3, orange, 1.as1"

        fireEvent.change(productTextarea, { target: {value: input} })
        fireEvent.click(submitButton)

        expect(productTextarea.textContent).toContain(input)
        expect(store.getState().products.products).toEqual(validProductList)
    })

    test('withnumbers as product names, product list is not updated', () => {
        const { getByText, getByLabelText } = renderComponent()

        const productTextarea = getByLabelText(textareaRegex)
        const submitButton = getByText(buttonRegex)
        const input = "apple, 3, 42, 1.45"

        fireEvent.change(productTextarea, { target: {value: input} })
        fireEvent.click(submitButton)

        expect(productTextarea.textContent).toContain(input)
        expect(store.getState().products.products).toEqual(validProductList)
    })
})
