import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  razorpay_payment_id:{
    type:String
  },
  razorpay_order_id: {
    type:String
  },
  razorpay_signature:{
    type:String
  },
});
export const Payments=mongoose.model("Payments" , PaymentSchema);
