import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  Email: {
    type: String,
    unique: true,
  },
  Password: {
    type: String,
    unique: true,
  },
  PhoneNo: {
    type: Number,
  },
  Address: {
    type: String,
  },
  IsSeller: {
    type: Boolean,
    default: false,
  },
  IsSubscriber: {
    type: Boolean,
    default: false,
  },
  CreatedAt: {
    type: String,
    default: Date.now(),
  },
  SoldItems:{
    type: Number,
    default:0
  },
  TotalProducts: {
    type: Number,
    default:0,
  }
});

export const User = mongoose.model("Users", UserSchema);
