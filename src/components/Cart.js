const Cart = ({cartState}) => {

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
                    <span>{cartState.totalFormatted}</span>
                </div>
            </div>)
            : <></>
    );
};

export default Cart;