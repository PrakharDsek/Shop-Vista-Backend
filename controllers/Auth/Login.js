import { User } from "../../model/Auth/CreateUser.js";
import "dotenv/config.js";
export const makeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Kindly enter email and password",
      });
    }

    const findOne = await User.findOne({
      Email: email,
      Password: password,
    });
    if (!findOne) {
      return res.status(404).json({
        success: false,
        message: "Account Not found",
      });
    }

    res
      .status(200)
      .cookie("userid", findOne._id, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .header("Access-Control-Allow-Origin", process.env.FRONTEND_URL)
      .json({
        success: true,
        message: "Logged in to account",
        data: findOne,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

export const LoginWithUserId = async (req, res) => {
  try {
    const { userid } = req.cookies;
    if (!userid) {
      res.status(200).json({
        success: false,
        message: "User is not logged in",
      });
    } else {
      const UserFind = await User.findById(userid);
      if (UserFind) {
        res.status(200).json({
          success: true,
          message: "User Logged in",
          data: UserFind,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "User is not logged in",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("userid").status(200).json({
      success: true,
      message: "User logged out",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
