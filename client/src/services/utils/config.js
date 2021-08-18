import { getPaymentMethods } from "../api";

const getConfig = async (onSubmit, onAdditionalDetails) => {
    const paymentMethods = await getPaymentMethods();
    return {
      paymentMethodsResponse: paymentMethods, 
      clientKey: process.env.REACT_APP_ADYEN_CLIENT_KEY,
      locale: "en_US",
      environment: "test",
      onSubmit,
      onAdditionalDetails,
      paymentMethodsConfiguration: {
        card: {
          hasHolderName: true,
          holderNameRequired: false,
          enableStoreDetails: true,
          hideCVC: false,
          name: 'Credit or debit card',
          onSubmit, // Overrides the global configuration.
        }
      }
    };
  };

  export default getConfig;