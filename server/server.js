
const express = require('express');
const { Client, Config, CheckoutAPI } = require('@adyen/api-library');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const cors = require('cors');

// Server config
const app = express();
const port = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// set static folder
app.use(express.static('../build'));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


// Adyen config
const config = new Config();
config.apiKey = process.env.ADYEN_APIKEY;
config.merchantAccount = process.env.ADYEN_MERCHENT_ACCOUNT;
const client = new Client({ config });
client.setEnvironment("TEST");
const checkout = new CheckoutAPI(client);

// Routes
app.get('/api/paymentMethods', async (req, res) => {
    try {
        const response = await checkout.paymentMethods({
            channel: 'Web',
            merchantAccount: config.merchantAccount
        });
        res.send(JSON.stringify(response));
    } catch (error) {
        console.error(error);
    }
});

app.post('/api/initiatePayment', async (req, res) => {
    const currency = req.body.currency || 'USD';
    const value = req.body.value || 0;
    try {
        const refId = uuidv4();
        const response = await checkout.payments({
            reference: refId,
            merchantAccount: config.merchantAccount,
            amount: { currency, value },
            channel: 'Web',
            browserInfo: req.body.browserInfo,
            returnUrl: '/',
            paymentMethod: {
                type: 'scheme',
                encryptedCardNumber: "test_4111111111111111",
                encryptedExpiryMonth: "test_03",
                encryptedExpiryYear: "test_2030",
                encryptedSecurityCode: "test_737"
            },
            additionalData: { alllow3DS2: true }
        });
        res.send(JSON.stringify(response));
    } catch (error) {
        console.error(error);
    }
});

app.post('/api/additionalDetails', async (req, res) => {
    const payload = {
        paymentData: req.body.paymentData
    };
    try {
        const response = await checkout.paymentsDetails(payload);
        res.send(JSON.stringify({ action: response.action || null, resultCode: response.resultCode }));
    } catch (error) {
        console.error(error);
    }
});


app.listen(process.env.PORT || port, () =>
    console.log(`Listening on PORT:${port}`)
);
