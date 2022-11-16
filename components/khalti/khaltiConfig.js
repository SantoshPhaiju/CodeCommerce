import axios from "axios";

let config = {
  // replace this key with yours
  publicKey: process.env.NEXT_PUBLIC_KHALTI_TEST_PUBLIC_KEY,
  productIdentity: Math.random(),
  productName: "CODE COMMERCE",
  productUrl: "http://localhost:3000",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      console.log(payload);

      axios
        .post(
          `${process.env.NEXT_PUBLIC_HOST}/api/paymentverification`, {data: payload}
        )
        .then((response) => {
          console.log(response);
          alert("Transaction successfull!")
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

export default config;
