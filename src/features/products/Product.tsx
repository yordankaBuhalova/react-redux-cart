import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import styles from './Product.module.css';
import { addProducts } from './productSlice'
import { enableMapSet } from 'immer'

enableMapSet()

export function Product() {
    const [productList, setProductList] = useState('apple, 2, banana, 5');

    const dispatch = useAppDispatch()

    const onFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value
        const newValueAsArray = newValue.split(",")
        var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/;
        var test_res = format.test(newValue)

        let validity = ""
        if (test_res) {
            validity = "Input must contain letters, numbers, commas and dots only!"
        }
        else if(newValueAsArray.length%2 != 0) {
            validity = "Input must consist of one or more products and their prices, separated by a comma!"
        }

        for (let i=0; i < newValueAsArray.length; i++) {
            if(i%2 == 0) {
                if (/\d/.test(newValueAsArray[i]))
                    validity = "Product names cannot contain numbers"
            } else {
                if(Number.isNaN(parseFloat(newValueAsArray[i])) || /[A-Za-z]/.test(newValueAsArray[i]))
                    validity = "Prices must be specified as a number"
            }
        }

        e.target.setCustomValidity(validity)
        setProductList(newValue)
    }

    return (
        <div>
            <div className={styles.row}>Add Product List</div>
            <form onSubmit={(e) => {
                    e.preventDefault()
                    dispatch(addProducts(productList))
                }}>
                <textarea
                    className={styles.textbox}
                    name="productList"
                    aria-label="Add product"
                    value={productList}
                    onChange={(e) => onFormChange(e)}
                />
                <button
                    className={styles.button}
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
  }