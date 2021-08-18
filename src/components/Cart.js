const Cart = () => {
    return (
        <div className="cart">
            <div className="cart-title">You're Cart</div>
            <div className="item">
                <div className="item-image">
                    <img src="https://media.guitarcenter.com/is/image/MMGS7/L69587000002000-02-250x250.jpg" alt="Gibson Lespaul Electric Guitar" />
                </div>
                <div className="item-desc">
                    Gibson Les Paul Traditional PRO V Flame Top Electric Guitar Blueberry Burst
                </div>
                <div className="item-price">
                    $2,799.99
                </div>
            </div>
            <div className="cart-total">
                <span>Total:</span>
                <span>$2,799.99</span>
            </div>
        </div>
    );
};

export default Cart;