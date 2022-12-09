import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Product } from './features/products/Product';
import { ProductList } from './features/products/ProductsLIst';
import { Basket } from './features/basket/Basket';

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <div className='grid-container'>
                  <Product />

                  <ProductList />

                  <Basket/>
                </div>
        </div>
    </div>
  );
}

export default App;
