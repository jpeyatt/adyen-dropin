
const formatPrice = (price, locale, currency) => {
    var formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    });
    return formatter.format(price);
}

export { formatPrice };