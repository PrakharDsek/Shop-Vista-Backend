import { Sponsered } from "../../model/Payments/Sponsered.js";
import { Product } from "../../model/Products/Product.js";

export const BecomeSponsered = async (req, res) => {
  try {
    const { userId } = req.body;
    const updateProduct = await Product.updateMany(
      { SellerId: userId },
      { Sponsered: true }
    );
    if (updateProduct.modifiedCount !== 0) {
      await Sponsered.create({
        UserId: userId,
        Products: updateProduct,
      });
      res.status(200).json({
        success: true,
        message: "Became sponsors",
        data: updateProduct,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Already A sponsor",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
