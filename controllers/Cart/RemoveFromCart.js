import { Cart } from "../../model/Carts/Cart.js";

export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.query;
    const cart = await Cart.findOne({UserId: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const index = cart.CartProductIds.indexOf(productId);
    if (index === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cart.CartProductIds.splice(index, 1);
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
