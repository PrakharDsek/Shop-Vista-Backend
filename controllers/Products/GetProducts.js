import { Orders } from "../../model/Orders/Orders.js";
import { Product } from "../../model/Products/Product.js";

export const GetProducts = async (req, res) => {
  try {
    if (req.query.type == "category") {
      const { category } = req.query;
      const FindProducts = await Product.find({ Category: category });
      if (FindProducts) {
        res.status(200).json({
          success: true,
          message: "Got products",
          data: FindProducts,
        });
      } else
        res.status(404).json({
          success: false,
          message: "Product not found",
        });
    } else {
      const getProductTrustedAll = await Product.find({ Trusted: true });
      res.status(200).json({
        success: true,
        message: "Got all products",
        data: getProductTrustedAll,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getProductsSponsered = async (req, res) => {
  try {
    const sponsoredProducts = await Product.find({ Sponsered: true });

    if (sponsoredProducts.length > 0) {
      res.status(200).json({
        success: true,
        message: "Got all the sponsored products",
        data: sponsoredProducts,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No sponsored products found",
        data: [],
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductsById = async (req, res) => {
  try {
    const { productId } = req.query;
    const FindProduct = await Product.findById(productId);
    res.status(200).json({
      success: true,
      message: "Got the product",
      data: FindProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductsByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    const FindProduct = await Product.find({SellerId:userId});
    res.status(200).json({
      success: true,
      message: "Got the product",
      data: FindProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  const { userId } = req.query;
  try {
    const getOrders = await Orders.find({ OrdererId: userId });
    res.status(200).json({
      success: true,
      message: "Got all orders",
      data: getOrders,
    });
  } catch (error) {
    res.status(400).json({
      success: false ,
      message: error.message
    })
  }
};
