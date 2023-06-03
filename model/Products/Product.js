import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  SellerName: {
    type: String,
  },
  SellerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  Name: {
    type: String,
    maxlength: 15,
  },
  Title: {
    type: String,
  },
  Description: {
    type: String,
  },
  BriefDesc: {
    type: String,
  },
  ImageURL: {
    type: Array,
  },
  VideoURL: {
    type: String,
  },
  Price: {
    type: Number,
  },
  Stars: {
    type: Number,
    default: 4,
  },
  Comments: {
    type: Array,
  },
  Sponsered: {
    type: Boolean,
    default: false,
  },
  Discount: {
    type: Number,
    default: 2,
  },
  Offers: {
    type: Array,
  },
  Category: {
    type: String,
  },
  Specifications: {
    type: Array,
  },
  Stock: {
    type: Number,
    default: 1,
  },
  Trusted: {
    default: true,
    type: Boolean,
  },
});
export const Product = mongoose.model("Products", ProductSchema);
