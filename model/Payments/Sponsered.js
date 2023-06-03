import mongoose from "mongoose";

const SponseredModel = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  ProductId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
  },
});

export const Sponsered= mongoose.model("Sponsers" ,SponseredModel)