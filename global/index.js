const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
app.use(express.json());

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors());

const coingeckoApi = require("coingecko-api");
const CoinGecko = require("coingecko-api");
//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
const getpriceoftron = async () => {
  const params = {
    order: CoinGecko.ORDER.MARKET_CAP_DESC,
  };
  let data = await CoinGeckoClient.coins.markets({ params });
  var i = 1;

  var a = [data];
  var price = 0;
  //   console.log(a.length);
  // console.log(a[0].data.length);
  for (var x = 0; x < a[0].data.length; x++) {
    if (a[0].data[x]["symbol"] === "trx") {
      price = a[0].data[x]["current_price"];
      break;
    }
  }
  // console.log(price);
  return price;
};

app.get("/get", async (req, res) => {
  // const a = await req.query.a;
  // const b = await req.query.b;
  // console.log(a);
  // console.log(b);

  // let c;
  try {
    // c = parseInt(a) + parseInt(b);
    const x = await getpriceoftron();
    res.status(201).send({ price: x });
  } catch (e) {
    res.status(400).send({ post: false });
  }
});
//fkasjf
app.listen(port, () => {
  console.log("the server is on the port", port);
});
