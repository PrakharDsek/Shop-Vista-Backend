import { Cart } from "../../model/Carts/Cart.js";

export const AddToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOneAndUpdate(
      {UserId: userId },
      { $push: { CartProductIds: productId } },
      { new: true }
    );
    if (cart) {
      res.status(200).json({
        success: true,
        message: "Added to cart successfully",
        data: cart,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An error occurred",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
