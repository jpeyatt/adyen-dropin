
import axios from 'axios';

const BASE_API = process.env.REACT_APP_BASE_API;

const getPaymentMethods = async (url) => {
    const resp = await axios.get(`${BASE_API}/paymentMethods`);
    return resp.data;
};

const makePayment = async () => {
    const resp = await axios.post(`${BASE_API}/initiatePayment`);
    return resp.data;
};

const makeDetailsCall = async () => {
    const resp = await axios.post(`${BASE_API}/additionalDetails`);
    return resp.data;
};


export { getPaymentMethods, makePayment, makeDetailsCall };