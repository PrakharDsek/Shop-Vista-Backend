import { Product } from "../../model/Products/Product.js";

export const searchEngine = async (req, res) => {
  try {
    const { query } = req.query;
    const Search = await Product.find({
      Name: { $regex: ".*" + query + ".*", $options: "i" },
    });
    if (Search.length > 0) {
      res.status(200).json({
        success: true,
        message: `Search Results For ${query}`,
        data: Search,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const SearchEngineCategory = async (req, res) => {
  try {
    const { query } = req.query;
    const Products = await Product.find({ Category: query });
    res.status(200).json({
      success: true,
      message: "Got the products",
      data: Products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
