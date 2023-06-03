import { User } from "../../model/Auth/CreateUser.js";
import {Product} from "../../model/Products/Product.js"

export const DeleteAccount = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Id not provided",
      });
    }

    if (req.cookies.userid !== userId) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    const findOne = await User.findByIdAndDelete(userId);
    const DEleteAllProducts=await Product.findOneAndDelete({SellerId: userId})
    if (findOne&&DEleteAllProducts !== null) {
      res.clearCookie("userid").status(200).json({
        success: true,
        message: "Account deleted and products also",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
