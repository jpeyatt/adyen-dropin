import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Success = ({ orderId, resetState }) => {
    const history = useHistory([]);

    useEffect(() => {
        if (!orderId) {
            history.push('/');
        }
    });

    const onReturnClick = () => {
        resetState(null);
        history.push('/');
    };

    return (
        <div>
            <h1>Payment Successfull!</h1>
            <h3>Your reference no. is #{orderId}.</h3>
            <button className="success-return-btn" onClick={onReturnClick}>Return</button>
        </div>
    );
};

export default Success;