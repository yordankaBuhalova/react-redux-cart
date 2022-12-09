import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import styles from './Product.module.css';
import { addProducts } from './productSlice'
import { enableMapSet } from 'immer'

enableMapSet()

export function Product() {
    const [productList, setProductList] = useState('apple, 2, bannana, 5');
    
    const dispatch = useAppDispatch()

    return (
        <div>

            <div className={styles.row}>Add Product List</div>
            <div>
                <textarea
                    className={styles.textbox}
                    name="productList"
                    aria-label="Add product"
                    value={productList}
                    onChange={(e) => setProductList(e.target.value)}
                />
                <button
                    className={styles.button}
                    onClick={() => dispatch(addProducts(productList))}
                >
                    Submit
                </button>
            </div>
        </div>
    );
  }