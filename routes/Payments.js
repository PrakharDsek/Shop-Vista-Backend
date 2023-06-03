import express from "express";
import { BecomeSponsered } from "../controllers/Paid/Sponsered.js";
import { Subscribe } from "../controllers/Paid/Subscriber.js";
import {
  createOrder,
  getSoldProducts,
  verifyPayment,
} from "../controllers/Payments/PaymentController.js";

const Router = express.Router();
Router.post("/payments/order/create", createOrder);
Router.post("/payments/verify", verifyPayment);
Router.get("/payments/getAllProductsSold", getSoldProducts);

Router.post("/payments/free/sponsered", BecomeSponsered);
Router.post("/payments/free/subscription", Subscribe);

export default Router;
