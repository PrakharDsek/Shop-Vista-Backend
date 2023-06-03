import { User } from "../../model/Auth/CreateUser.js";
import { Product } from "../../model/Products/Product.js";

export const UpdateProduct = async (req, res) => {
  try {
    const { productId } = req.body;
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

    const {
      name,
      title,
      description,
      briefDescription,
      specifications,
      price,
      discount,
      offers,
      stars,
      stock,
      comments
    } = req.body;
    const updatedFields = {};

    if (name) {
      updatedFields.Name = name;
    }
    if (title) {
      updatedFields.Name = title;
    }
    if (specifications) {
      updatedFields.Specifications = specifications;
    }

    if (description) {
      updatedFields.Description = description;
    }

    if (briefDescription) {
      updatedFields.BriefDescription = briefDescription;
    }

    if (price) {
      updatedFields.Price = price;
    }

    if (discount) {
      updatedFields.Discount = discount;
    }

    if (offers) {
      updatedFields.Offers = offers;
    }

    if (stars) {
      updatedFields.Stars = stars;
    }

    if (stock) {
      updatedFields.Stock = stock;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(500).json({
        success: false,
        message: "Failed to update product",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
 
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
