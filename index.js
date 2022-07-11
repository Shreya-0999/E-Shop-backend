const express = require('express');
const app = express();
const path = require("path");
const cors = require("cors");
const shortid = require("shortid");
const Razorpay = require("razorpay");
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: "rzp_test_A9glIRKKrM5Tig",
  key_secret: "Weub0kEizcgmIgSWMtriNdOS",
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/logo.png", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.png"));
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const currency = "INR";
  const options = {
    amount: req.body.amount * 100,
    currency: currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response)
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 1337, () => {
  console.log("Backend running at localhost:1337");
});
