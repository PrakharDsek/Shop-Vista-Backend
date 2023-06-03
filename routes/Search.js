import express from "express";
import {
  searchEngine,
  SearchEngineCategory,
} from "../controllers/SearchEngine/SeearchEngine.js";

const Router = express.Router();

Router.get("/search", searchEngine);
Router.get("/search/category", SearchEngineCategory);

export default Router;
