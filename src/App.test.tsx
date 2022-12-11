/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('all application parts are rendered', () => {
    const { getByText } = render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    expect(getByText(/Add Product List/i)).toBeTruthy();
    expect(getByText(/Products List/i)).toBeTruthy();
    expect(getByText(/Shopping Basket/i)).toBeTruthy();
});
