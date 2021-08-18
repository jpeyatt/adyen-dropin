
import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';
import { useEffect, useRef } from 'react';
import { makePayment, makeDetailsCall } from "../services/api";
import { useHistory } from "react-router-dom";
import getConfig from '../services/utils/config';
import Cart from './Cart';


const Checkout = ({ onPaymentResponse }) => {
    const dropinRef = useRef(null);
    const history = useHistory([]);

    const onSubmit = (state, dropin) => {
        // Global configuration for onSubmit
        // Your function calling your server to make the `/payments` request
        makePayment(state.data)
            .then(response => {
                if (response.action) {
                    // Drop-in handles the action object from the /payments response
                    dropin.handleAction(response.action);
                } else {
                    // Your function to show the final result to the shopper
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
        makeDetailsCall(state.data)
            .then(response => {
                if (response.action) {
                    // Drop-in handles the action object from the /payments response
                    dropin.handleAction(response.action);
                } else {
                    // Your function to show the final result to the shopper
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
                        // Starting from version 4.0.0, Drop-in configuration only accepts props related to itself and cannot contain generic configuration like the onSubmit event.
                        openFirstPaymentMethod: true
                    })
                    .mount(dropinRef.current);
            });
    }, [onAdditionalDetails, onSubmit]);

    return (
        <div>
            <Cart />
            <div ref={dropinRef} className="dropin-container">
            </div>
        </div>

    );
}

export default Checkout;