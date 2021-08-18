
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
        makePayment(state.data)
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
            <Cart />
            <div ref={dropinRef} className="dropin-container">
            </div>
        </div>

    );
}

export default Checkout;