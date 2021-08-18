
import axios from 'axios';

const BASE_API = process.env.REACT_APP_BASE_API;

const getPaymentMethods = async () => {
    const resp = await axios.get(`${BASE_API}/paymentMethods`);
    return resp.data;
};

const makePayment = async (state, currency, value) => {
    const resp = await axios.post(`${BASE_API}/initiatePayment`, {
        currency,
        value
    });
    return resp.data;
};

const makeDetailsCall = async (state, paymentData) => {
    const resp = await axios.post(`${BASE_API}/additionalDetails`, {
        paymentData
    });
    return resp.data;
};

export { getPaymentMethods, makePayment, makeDetailsCall };