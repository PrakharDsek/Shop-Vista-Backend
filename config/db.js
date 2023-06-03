import mongoose from "mongoose";
import "dotenv/config";

const DB = () => {
  mongoose
    .connect(process.env.MONGOURI, {
      dbName: "SOPO",
    })
    .then((client) => console.log("Server is connected"))
    .catch((error) => console.log(error));
};

export default DB;
