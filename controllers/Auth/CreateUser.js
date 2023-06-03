 import { User } from "../../model/Auth/CreateUser.js";
import { Seller } from "../../model/Auth/SellerAccount.js";
import { Cart } from "../../model/Carts/Cart.js";
import "dotenv/config.js";

export const createUser = async (req, res) => {
  try {
    const { name, address, password, email, phoneNo, subscriber, Isseller } =
      req.body;

    // Check if a user with the same email or password already exists in the database
    const existingUser = await User.findOne({
      $or: [{ Email: email }, { Password: password }],
    });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with the same email or password already exists",
      });
    }

    // Create a new user with the provided details
    const newUser = await User.create({
      Name: name,
      Email: email,
      Password: password,
      PhoneNo: phoneNo,
      Address: address,
      IsSeller: Isseller,
      IsSubscriber: subscriber,
    });

    // Set the userId cookie on successful account creation
    res
      .cookie("userId", newUser._id, {
        maxAge: 24 * 60 * 60 * 60, // Set the cookie expiry time to 1 hour (in milliseconds)
        httpOnly: true, // Set the HttpOnly flag to prevent client-side script access
        sameSite: "None",
        Secure: true,
      })
      .header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    //Make an empty cart for user
    Cart.create({
      UserId: newUser._id,
      CartProductIds: [],
    });

    // Return a success response with the created user details
    res.status(201).json({
      success: true,
      message: "Account created",
      data: newUser,
    });
  } catch (error) {
    // Return an error response if something goes wrong
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const createSeller = async (req, res) => {
  const {
    name,
    email,
    phoneNo,
    houseNo,
    landmark,
    city,
    postalCode,
    officeAddress,
    typeOf,
  } = req.body;
  try {
    const checkSeller = await Seller.find({ Email: email });
    if (checkSeller.length === 0) {
      // Check the length of the result array
      const sellerAcc = await Seller.create({
        name: name, // Use lowercase property names
        email: email,
        phoneNo: phoneNo,
        houseNo: houseNo,
        landmark: landmark,
        city: city,
        postalCode: postalCode,
        officeAddress: officeAddress,
        typeOf: typeOf,
      });

      if (sellerAcc) {
        res.status(201).json({
          // Use status code 201 for successful creation
          success: true,
          message: "Registered as a seller",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to register",
        });
      }
    } else {
      res.status(409).json({
        // Use status code 409 for conflict
        success: false,
        message: "Already a seller exists with given details",
        data:checkSeller
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};