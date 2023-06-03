import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  CartProductIds: {
    type: Array
  },
  Buyed: {
    type: Boolean,
    default: false
  }
});

export const Cart =mongoose.model("Carts" ,CartSchema);

