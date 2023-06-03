import express from "express";
import app from "../app.js";
import { createSeller, createUser } from "../controllers/Auth/CreateUser.js";
import {
  makeLogin,
  LoginWithUserId,
  logout,
} from "../controllers/Auth/Login.js";
import { GetUserData } from "../controllers/Auth/getUserData.js";
import { UpdateCreditential } from "../controllers/Auth/UpdateCreditentials.js";
import { DeleteAccount } from "../controllers/Auth/DeleteAccount.js";

const Router = express.Router();

Router.post("/auth/new", createUser);
Router.post("/auth/seller/new", createSeller);
Router.post("/auth/new", createUser);
Router.post("/auth/login", makeLogin);
Router.post("/auth/loginId", LoginWithUserId);
Router.get("/auth/find", GetUserData);
Router.get("/auth/logout", logout);
Router.put("/auth/update", UpdateCreditential);
Router.delete("/auth/delete", DeleteAccount);

export default Router;
