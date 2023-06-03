import express from "express";
import { CreateProduct } from "../controllers/Products/CreateProduct.js";
import {
  GetProducts,
  getOrders,
  getProductsById,
  getProductsByUserId,
  getProductsSponsered,
} from "../controllers/Products/getProducts.js";
import { UpdateProduct } from "../controllers/Products/UpdateProduct.js";
import { DeleteProduct } from "../controllers/Products/DeleteProduct.js";
import {
  AddComments,
  deleteComment,
} from "../controllers/SocialQuality/ProductComments.js";

const Router = express.Router();

Router.post("/products/new", CreateProduct);
Router.get("/products/get", GetProducts);
Router.get("/products/getOrders", getOrders);
Router.get("/products/getById", getProductsById);
Router.get("/products/getByUserId", getProductsByUserId);
Router.get("/products/get/Sponsered", getProductsSponsered);
Router.put("/products/update", UpdateProduct);
Router.delete("/products/delete", DeleteProduct);

Router.put("/product/addComment", AddComments);
Router.delete("/product/deleteComment", deleteComment);

export default Router;
