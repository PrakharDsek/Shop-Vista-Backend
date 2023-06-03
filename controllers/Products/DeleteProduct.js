import { User } from "../../model/Auth/CreateUser.js";
import { Product } from "../../model/Products/Product.js";

export const DeleteProduct = async (req, res) => {
  try {
    const { productId } = req.query;
    const user = await User.findById(req.cookies.userid);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.SellerId != req.cookies.userid) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to update this product",
      });
    }
    const deleteProduct = await Product.findByIdAndRemove(productId);
    if (deleteProduct) {
      res.status(200).json({
        successs: true,
        message: "deleted successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Error occured",
      });
    }
  } catch (error) {}
};
