import express from "express";
import App from "../app.js";
import cookieParser from "cookie-parser";

App.use(express.json());
App.use(cookieParser());
