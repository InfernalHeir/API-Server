const cron = require("node-cron");
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const TronWeb = require("tronweb");
require("dotenv").config();
const port = process.env.PORT || 3000;
const axios = require("axios");
app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GLOBAL VARIABLES
// var contract_functions = null;

// INITIALISING THE TRONWEB
const tronWeb = new TronWeb({
  fullHost: "https://api.shasta.trongrid.io",
  solidityNode: "https://api.shasta.trongrid.io",
  eventServer: "https://api.shasta.trongrid.io",
  privateKey: process.env.PRIVATE_KEY_MAINNET,
});

app.post("/send", async (req, res) => {
  let addr = req.body.address;
  let amt = req.body.amount;
  let miniprice;
  //console.log(addr, amt);
  try {
    await axios
      .get("https://globalcrypto.herokuapp.com/get")
      .then(function (response) {
        //console.log(response);
        miniprice = Math.round((amt * 1) / response.data.price);
        //console.log(miniprice);
      });
    let amount = await tronWeb.toSun(miniprice);
    console.log(amount);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // let contract = await tronWeb
    //   .contract()
    //   .at("TV5mqTdqdoKd6ZufZtrdzw4adft1KNt6sW");
    // console.log(contract);
    // // let sfd = await tronWeb.trx.getTokensIssuedByAddress(
    // //   "TV5mqTdqdoKd6ZufZtrdzw4adft1KNt6sW"
    // // );
    // // .log(sfd);

    // var parameter = [
    //   { type: "address", value: addr.toString() },
    //   { type: "uint256", value: amt },
    // ];

    // var options = {
    //   feeLimit: 100000000,
    //   callValue: 0,
    // };
    // const addressInHex = await tronWeb.address.toHex(
    //   "TV5mqTdqdoKd6ZufZtrdzw4adft1KNt6sW"
    // );
    // console.log(addressInHex);
    // const addresstwo = await tronWeb.address.toHex(
    //   "TUEh5272gS7L4KdxD7EYNLnsvxJ7dk3Epc"
    // );
    // const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
    //   addressInHex,
    //   "transfer(address,uint256)",
    //   options,
    //   parameter,
    //   addresstwo
    // );
    // // console.log(transaction);
    // // transaction.transaction.raw_data.contract = contract;
    // // console.log(transaction.transaction.raw_data.contract);
    // // console.log(cont);
    // const aa = await tronWeb.trx.sign(
    //   transaction.transaction,
    //   "64fe7924eb9dd423aca710bf86321ff2a051cb604395b8e0a93688aafe162327"
    // );
    // console.log(aa);
    // const receipt = await tronWeb.trx.sendRawTransaction(aa);

    // console.log(receipt);
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // await tronWeb.trx.sendToken(
    //   "TV5mqTdqdoKd6ZufZtrdzw4adft1KNt6sW",
    //   1000,
    //   "TRONX",
    //   process.env.PRIVATE_KEY_MAINNET
    // );
    // console.log(contract);
    // var userdepositedamt = await contract
    //   .amountdeposited(process.env.ADDRESS_INPUT)
    //   .call();
    // console.log(userdepositedamt);
    // var x = tronWeb.fromSun(tronWeb.toDecimal(userdepositedamt));
    // console.log(x);
    // await contract
    //   .deposit()
    //   .send({
    //     feeLimit: 100_000_000,
    //     callValue: tronWeb.toHex(
    //       tronWeb.toSun(
    //         Math.round(this.actulaamount * (this.investTrxAmount / 20))
    //       )
    //     ),
    //   })
    //   .sendTransaction(addr, amount, process.env.PRIVATE_KEY_MAINNET);
    const tid = await tronWeb.trx.sendTransaction(
      addr,
      amount,
      process.env.PRIVATE_KEY_MAINNET
    );
    //console.log(tid);
    res.status(200).send({ success: true, transactionid: tid.txid });
  } catch (e) {
    res.status(400).send({ success: false });
    console.log(e);
  }
});
// const a = async () => {
//   try {
//     const amount = await tronWeb.toHex(tronWeb.toSun(10));
//     await tronWeb.trx.sendTransaction(
//       process.env.ADDRESS,
//       amount,
//       process.env.PRIVATE_KEY_MAINNET
//     );
//     console.log("success");
//   } catch (e) {
//     console.log(e);
//   }
// };

// app.get("/link", async (req, res) => {
//   try {
//     // await contract_functions.payout(
//     //   this.payoutaddress,
//     //   tronWeb.toHex(tronWeb.toSun(this.payouttrxamount))
//     // )
//     // .send({
//     //   feeLimit: 100_000_000,
//     //   // callValue: tronWeb.toHex(tronWeb.toSun(this.investTrxAmount)),
//     // })
//     const amount = await tronWeb.toHex(tronWeb.toSun(10));
//     await tronWeb.trx.sendTransaction(
//       process.env.ADDRESS,
//       amount,
//       process.env.PRIVATE_KEY_MAINNET
//     );
//   } catch (e) {}
// });

app.listen(port, () => {
  console.log("Running on port" + port);
});

// // SCHEDULING THE TASK
// cron.schedule("*/10 * * * * *", async () => {
//   console.log("running a task every 5 minute");
//   try {
//     var data_of_users_array = await contract_functions.getEntries().call();
//     console.log(data_of_users_array.length);
//     console.log("hello");
//     if (data_of_users_array.length > 0) {
//       var getallusercount = await contract_functions.getAllUsersCount().call();
//       var availableToWithdraw = await tronWeb.fromSun(getallusercount);
//       console.log(availableToWithdraw);

//       data_of_users_array.map(async (data) => {
//         var addressInHex = await tronWeb.address.toHex(data);

//         var data_of_transfer_struct = await contract_functions
//           .players_address(addressInHex)
//           .call();

//         console.log("id ::::::", data_of_transfer_struct.id.toNumber());
//         console.log("address ::::::", data_of_transfer_struct.user_address);
//         console.log(
//           "amount ::::::",
//           data_of_transfer_struct.amount_to_send.toNumber()
//         );

//         if (data_of_transfer_struct.id.toNumber() != 0) {
//           if (data_of_transfer_struct.amount_to_send.toNumber() != 0) {
//             await tronWeb.trx.sendTransaction(
//               accounts,
//               amount,
//               process.env.PRIVATE_KEY_MAINNET
//             );
//           }
//         }
//       });
//     }
//   } catch (error) {
//     console.log("Error in schedular :::::", error);
//   }
// });
