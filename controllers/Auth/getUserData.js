import { User } from "../../model/Auth/CreateUser.js";

export const GetUserData = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId);
    if (!userId) {
      res.status(400).json({
        success: false,
        message: "Please provide id",
      });
    } else {
      const getUser = await User.findById(userId);
      if (!getUser) {
        res.status(404).json({
          success: false,
          message: "Account not found",
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Found Account with id ${userId}`,
          data: getUser,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
