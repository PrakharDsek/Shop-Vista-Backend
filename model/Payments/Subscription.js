import mongoose from "mongoose";

const SubscriptionModel = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  PurchasedDate: {
    type: Date,
    default: Date.now(),
  },
});

export const Subscription = mongoose.model("Subscribers", SubscriptionModel);
