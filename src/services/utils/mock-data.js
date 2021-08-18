import { v4 as uuid } from "uuid";
import { formatPrice } from "./format-price";

const MockProducts = [
    {
        id: uuid(),
        title: 'Gibson Les Paul Traditional PRO V Flame Top Electric Guitar Blueberry Burst',
        image: 'https://media.guitarcenter.com/is/image/MMGS7/L69587000002000-02-250x250.jpg',
        price: 2799.99,
        priceFormatted: formatPrice(2799.99, 'en-US', 'USD')
    }
];

export { MockProducts };