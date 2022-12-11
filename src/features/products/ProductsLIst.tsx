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
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Add to basket</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(products).map(name =>
                                <tr key={name} >
                                    <td>{name} </td>
                                    <td>{products[name]}</td>
                                    <td>
                                        <button className={styles.button} id={name}
                                        onClick={() => dispatch(addToCart(name))}> Add to basket</button>
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    );
}