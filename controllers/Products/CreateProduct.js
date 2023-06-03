import { User } from "../../model/Auth/CreateUser.js";
import { Product } from "../../model/Products/Product.js";

export const CreateProduct = async (req, res) => {
  try {
    const verifyUser = await User.findById(req.cookies.userid);
    //Check weather logged in or not
    if (!verifyUser) {
      res.status(400).json({
        success: false,
        message: "Login first",
            });
    } else {
      const {
        sellerName,
        name,
        title,
        description,
        briefDescription,
        imageURL,
        videoURL,
        comments,
        price,
        stars,
        discount,
        trusted,
        offers,
        category,
        stock,
        sellerId,
        sold,
        specifications,
      } = req.body;

      if (
        !sellerName ||
        !sellerId 
        
      ) {
        res.status(400).json({
          success: false,
          message: "Form incomplete",
        });
      } else {
        const CreateOne = await Product.create({
          SellerName: sellerName,
          SellerId: sellerId,
          Name: name,
          Title: title,
          Description: description,
          BriefDesc: briefDescription,
          ImageURL: imageURL,
          VideoURL: videoURL,
          Price: price,
          Stars: stars,
          Comments: comments,
          Trusted: true,
          Discount: discount,
          Offers: offers,
          Category: category,
          Stock: stock,
          Sold: sold,
          Specifications: specifications,
        });
        if (CreateOne) {
          res.status(201).json({
            success: true,
            message: "Created product",
            data: CreateOne,
          });
          await User.findByIdAndUpdate(sellerId ,
            {$inc : {TotalProducts :1}}
          )
        } else {
          res.status(500).json({
            success: false,
            message: "An error occured",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
