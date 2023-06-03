import App from "./app.js";
import "dotenv/config";
import DB from "./config/db.js";
import Razorpay from "razorpay";

DB();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAYKEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

App.listen(process.env.PORT, () => {
  console.log("Server running...");
});
