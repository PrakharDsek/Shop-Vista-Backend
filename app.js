import express from "express";
import Auth from "./routes/Auth.js";
import Cart from "./routes/Cart.js";
import Products from "./routes/Products.js";
import Payments from "./routes/Payments.js";
import Search from "./routes/Search.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

const App = express();

App.use(express.json());
App.use(cookieParser());
App.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"], // Specify the allowed headers for redirection
    credentials: true, // Enable CORS credentials if required
  })
);
App.use("/api/v1", Auth);
App.use("/api/v1", Products);
App.use("/api/v1", Payments);
App.use("/api/v1", Cart);
App.use("/api/v1", Search);

export default App;
