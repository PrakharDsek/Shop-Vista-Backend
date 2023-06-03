import mongoose from "mongoose";

const seller = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    unique: true,
    require: true,
  },
  PhoneNo: {
    type: Number,
    require: true,
  },
  House: {
    type: String,
    require: true,
  },
  Landmark: {
    type: String,
    require: true,
  },
  City: {
    type: String,
    require: true,
  },
  PostalCode: {
    type: Number,
    require: true,
  },
  OfficeAddress: {
    type: String,
    require: true,
  },
  TypeOf: {
    type: String,
    require: true,
  },
});

export const Seller=mongoose.model("Sellers" ,seller)