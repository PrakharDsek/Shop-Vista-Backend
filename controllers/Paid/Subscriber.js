import { User } from "../../model/Auth/CreateUser.js";
import { Subscription } from "../../model/Payments/Subscription.js";

export const Subscribe = async (req, res) => {
  try {
    const { userId } = req.body;
    const FindUser = await User.findByIdAndUpdate(userId, {
      IsSubscriber: true,
    });
    Subscription.create({
      UserId: userId,
    });
    res.status(200).json({
      success: true,
      message: "Purchased subscription",
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
  }
};
