import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    getProductsSelector,
} from './productSlice';
import styles from './Product.module.css';
import { addToCart } from '../basket/basketSlice';


export function ProductList() {
    const products = useAppSelector(getProductsSelector);
    const dispatch = useAppDispatch();
    return (
        <div >
            <div className={styles.row}>Products List</div>
            <div className={styles.row}>

                <div id="productList">
                <table >
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Add to basket</th>

                    </tr>

                    {Object.keys(products).map(name =>
                    <tr id={name}>
                        <td>{name} </td><td>{products[name]}</td>
                        <button className={styles.button}
                        onClick={() => dispatch(addToCart(name))}> Add to basket</button>
                    </tr>
                    )}

                </table>

                </div>
            </div>
        </div>
    );
}