import { User } from "../../model/Auth/CreateUser.js";

export const UpdateCreditential = async (req, res) => {
  try {
    const { userId, response } = req.body; // Destructure both userId and response from req.body

    if (!userId || !response) {
      // Check if both userId and response are provided
      res.status(400).json({
        success: false,
        message: "userId and response are required",
      });
      return; // Return early to avoid executing the rest of the code
    }

    const findOne = await User.findByIdAndUpdate(userId, { response });

    if (findOne) {
      res.status(200).json({
        success: true,
        message: "Updated the credentials",
        data: findOne,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Wrong id provided",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
