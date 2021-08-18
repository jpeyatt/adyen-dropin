const Error = ({type, error}) => {

    return (
        <div>
            <h2>Sorry something has gone wrong with your payment.</h2>
            {
                type === 'Refused' ? 
                    <span>You're payment has not been authorised.</span> :
                type === 'Error' ? 
                    <span>Error: {error}</span> : 
                        <></>
            }
        </div>
    );
};

export default Error;