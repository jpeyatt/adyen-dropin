import { formatPrice } from '../services/utils/format-price';

class CartConfig {
    constructor(products, locale, currency) {
        this.products = products;
        this.currency = currency;
        this.locale = locale;
        this.total = this.getTotal();
        this.totalFormatted = formatPrice(this.total, locale, currency);
    }
    getTotal() {
        let total = 0;
        for (let i = 0; i < this.products.length; i++) total += this.products[i].price;
        return total;
    }
};

export default CartConfig;