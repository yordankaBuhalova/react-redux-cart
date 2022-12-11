import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styles from '.././products/Product.module.css';
import { getProductsSelector } from '../products/productSlice';
import { getBasketSelector, addToCart, removeFromCart, removeProductFromCart } from './basketSlice';


export function Basket() {
    const cart = useAppSelector(getBasketSelector);
    const products = useAppSelector(getProductsSelector);
    const dispatch = useAppDispatch();

    let totalBasketPrice = () => {
        let total = 0
        Object.keys(cart).map((name) => {
            total += cart[name] * products[name]
        })
        return total
    }
    return (
        <div>
            <div className={styles.row}>Shopping Basket</div>
                <table >
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total price</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(cart).map(name =>
                    <tr key={name}>
                        <td>{name}</td>
                        <td>{products[name]}</td>
                        <td>
                            <button className={styles.button} onClick={() => dispatch(removeFromCart(name))}> - </button>

                            {cart[name]}

                            <button className={styles.button} onClick={() => dispatch(addToCart(name))}> + </button>
                        </td>
                        <td>{products[name] * cart[name]}</td>
                        <td><button className={styles.button}onClick={() => dispatch(removeProductFromCart(name))}> X </button></td>
                    </tr>
                    )}</tbody>
                    <tfoot>
                        <tr>
                            <td>Total basket price: {totalBasketPrice()} </td>
                        </tr>
                    </tfoot>

                </table>

        </div>
);
}