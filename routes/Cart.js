import express from "express";
import { AddToCart } from "../controllers/Cart/AddToCart.js";
import { removeFromCart } from "../controllers/Cart/RemoveFromCart.js";
import { GetCart } from "../controllers/Cart/GetCart.js";

const Router=express.Router();

Router.put("/cart/add" ,AddToCart);
Router.delete("/cart/remove" ,removeFromCart);
Router.get("/cart/myCart" ,GetCart);

export default Router