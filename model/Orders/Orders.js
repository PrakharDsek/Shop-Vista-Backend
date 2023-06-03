import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
  OrdererId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  OrderId: {
    type: String,
    require: true,
  },
  Payment: {
    type: Boolean,
    default: false
  }, 
  DeliveryDate : {
    type: Date,
  }
});

export const Orders=mongoose.model("Orders" ,OrderSchema);
