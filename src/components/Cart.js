import { useEffect, useState } from "react";
import { MockProducts } from "../services/utils/mock-data";
import { formatPrice } from '../services/utils/format-price';
class CartConfig {
    constructor(products) {
        this.products = products;
        this.total = formatPrice(this.getTotal(products), 'en-US', 'USD');
    }
    getTotal(products) {
        let total = 0;
        for (let i = 0; i < products.length; i++) total += products[i].price;
        return total;
    }
};

const Cart = () => {
    const [cartState, setCartState] = useState(null);

    useEffect(() => {
        setCartState(new CartConfig(MockProducts));
    }, []);

    return (
        cartState ?
            (<div className="cart">
                <div className="cart-title">You're Cart</div>
                {
                    cartState.products.map(product =>
                        <div key={product.id} className="item">
                            <div className="item-image">
                                <img src={product.image} alt="Gibson Lespaul Electric Guitar" />
                            </div>
                            <div className="item-desc"> {product.title} </div>
                            <div className="item-price"> {product.priceFormatted}</div>
                        </div>
                    )
                }
                <div className="cart-total">
                    <span>Total:</span>
                    <span>{cartState.total}</span>
                </div>
            </div>)
            : <></>
    );
};

export default Cart;