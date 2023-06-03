import { instance } from "../../index.js";
import crypto from "crypto";
import { Payments } from "../../model/Payments/Payment.js";
import { Product } from "../../model/Products/Product.js";
import { Orders } from "../../model/Orders/Orders.js";
import { Cart } from "../../model/Carts/Cart.js";
import { User } from "../../model/Auth/CreateUser.js";
import { SoldProduct } from "../../model/Products/Sold Products.js";

export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100), // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    await Orders.create({
      OrdererId: req.body.ordererID,
      OrderId: order.id,
      ProductId: req.body.productId,
      Payment: false,
      DeliveryDate: req.body.deliveryDate,
    });
    res.status(200).json({
      success: true,
      message: "Created order",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  const {
    razorPayId,
    razorPayOrderId,
    razorPaySign,
    userId,
    productId,
    sellerId,
    quantity,
    price,
  } = req.body;
  const body = req.body.razorPayOrderId + "|" + req.body.razorPayId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body)
    .digest("hex");

  const isAuth = expectedSignature === razorPaySign;

  try {
    await Payments.create({
      razorpay_payment_id: razorPayId,
      razorpay_order_id: razorPayOrderId,
      razorpay_signature: razorPaySign,
    });

    const updateCart = await Cart.findOneAndUpdate(
      { UserId: userId },
      {
        Buyed: true,
        CartProductIds: [],
      }
    );

    const updateOrder = await Orders.findOneAndUpdate(
      { OrderId: razorPayOrderId },
      {
        Payment: true,
      }
    );
    const updateUserStats = await SoldProduct.create({
      ProductId: productId,
      ProductSeller: sellerId,
      ProductBuyer: userId,
      ProductQuantity: quantity,
      ProductSoldPrice: price,
    });
    if (!updateCart || !updateOrder) {
      res.status(400).json({
        success: false,
        message: "Error while updating cart or order",
      });
    } else if (isAuth) {
      res.status(200).json({
        success: true,
        message: "Payment verified and added to the database",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment is not verified",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while adding the order to the database",
    });
    console.log(error.message);
  }
};

export const getSoldProducts = async (req, res) => {
 try {
   const { userId } = req.query;
   const { data } = await SoldProduct.find({ ProductSeller: userId });
   if (data) {
     res.status(200).json({
       success: true,
       message: "Got all the sold products",
       data: data,
     });
   } else {
     res.status(200).json({
       success: true,
       message: "No products were found for the user",
     });
   }
 } catch (error) {
  res.status(200).json({
    success: false,
    message: error.message,
  });
 }
};
