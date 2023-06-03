import mongoose from "mongoose"

const SoldProducts = new mongoose.Schema({
  ProductId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  ProductBuyer: {
    type: mongoose.Schema.Types.ObjectId,
  },
  ProductSeller: {
    type: mongoose.Schema.Types.ObjectId,
  },
  ProductQuantity: {
    type: Number,
  },
  ProductSoldPrice: {
    type: Number,
  },
});

export const SoldProduct =mongoose.model("Sold Products" ,SoldProducts);