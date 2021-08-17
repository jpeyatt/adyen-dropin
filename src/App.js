
import './App.css'
import { useEffect, useState } from 'react';
import Checkout from './components/Checkout';
import Pending from './components/Pending';
import Success from './components/Success';
import Error from './components/Error';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const [paymentResponse, setPaymentResponse] = useState(null);

  const onPaymentResponse = (response) => {
    setPaymentResponse(response);
  }

  useEffect(() => {

  }, [paymentResponse]);

  return (
    <div className="app-wrapper">
      <Router>
        <Switch>
        <Route path="/success">
            <Success orderId={paymentResponse ? paymentResponse.pspReference : null} resetState={onPaymentResponse}  />
          </Route>
          <Route path="/pending">
            <Pending />
          </Route>
          <Route path="/refused">
            <Error type="Refused" />
          </Route>
          <Route path="/error">
            <Error type="Error" error={paymentResponse} />
          </Route>
          <Route path="/">
            <Checkout onPaymentResponse={onPaymentResponse} />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}



export default App;
