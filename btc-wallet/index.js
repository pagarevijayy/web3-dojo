// POC - send txn

const sendBitcoin = require("./sendBtc.js");

const DESTINATION_ADDRESS = "XXXXXXXXXXXXXXXXXXXX";

sendBitcoin(DESTINATION_ADDRESS, 0.0001)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
