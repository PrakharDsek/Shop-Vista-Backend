import { Product } from "../../model/Products/Product.js";

export const AddComments = async (req, res) => {
  try {
    const { comment, productId ,commenterId,rating } = req.body;
    //here we will add a comment for the product

    //FInd the Product by id
    const ProductFinder = await Product.findByIdAndUpdate(productId, {
      $push: {
        Comments: { Comment: comment, Commenter: commenterId, Rating: rating },
      }, //Pushed the comment in the array
    });

    if (ProductFinder) {
      res.status(201).json({
        success: true,
        message: "Added comment",
        data: ProductFinder,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid productID",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId, productId } = req.body;

    // Find and update the product document to remove the comment
const product = await Product.findById(productId);

const commentIndex = product.Comments.findIndex((comment) => {
  return comment.Commenter === commentId;
});

if (commentIndex >= 0) {
  product.Comments.splice(commentIndex, 1);
  await product.save();
  res.status(200).json({
    success: false,
    message:"Deleted comment successfully",
    data:product
});
} else {
  res.status(404).json({ 
    success: false,
    message: "Comment not found" });
}

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
