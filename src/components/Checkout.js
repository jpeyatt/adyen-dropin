
import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';
import { useEffect, useRef, useState } from 'react';
import { makePayment, makeDetailsCall } from "../services/api";
import { useHistory } from "react-router-dom";
import getConfig from '../services/utils/config';
import Cart from './Cart';
import { MockProducts } from "../services/utils/mock-data";
import CartConfig from '../models/CartConfig.model';


const Checkout = ({ onPaymentResponse }) => {
    const dropinRef = useRef(null);
    const history = useHistory([]);
    const cart = new CartConfig(MockProducts, 'en-US', 'USD');
    const [paymentResponse, setPaymentResponse] = useState(null);

    const onSubmit = (state, dropin) => {
        makePayment(state.data, cart.currency, cart.total)
            .then(response => {
                if (response.action) {
                    dropin.handleAction(response.action);
                } else {
                    handlePaymentResponse(response);
                }
            })
            .catch(error => {
                throw Error(error);
            });
    };

    const handlePaymentResponse = (res, dropin) => {
        if (res.action) {
            dropin.handleAction(res.action);
        } else {
            onPaymentResponse(res); // Update parent state
            setPaymentResponse(res);
            switch (res.resultCode) {
                case 'Authorised':
                case 'PresentToShopper':
                    history.push('/success')
                    break;
                case 'Refused':
                    history.push('/refused');
                    break;
                case 'Pending':
                case 'Received':
                    history.push('/pending');
                    break;
                default:
                    history.push('/error');
                    break;
            }
        }
    };

    const onAdditionalDetails = (state, dropin) => {
        makeDetailsCall(state.data, paymentResponse[1])
            .then(response => {
                if (response.action) {
                    dropin.handleAction(response.action);
                } else {
                    handlePaymentResponse(response, dropin);
                }
            })
            .catch(error => {
                throw Error(error);
            });
    };

    useEffect(() => {
        getConfig(onSubmit, onAdditionalDetails)
            .then(res => {
                const checkout = new AdyenCheckout(res);
                checkout
                    .create('dropin', {
                        openFirstPaymentMethod: true
                    })
                    .mount(dropinRef.current);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Cart cartState={cart} />
            <div ref={dropinRef} className="dropin-container">
            </div>
        </div>

    );
}

export default Checkout;