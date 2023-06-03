import { Cart } from "../../model/Carts/Cart.js";

export const GetCart=async (req ,res) => {
    try {
        const {userId} =req.query;
        const FindCart=await Cart.find({UserId :userId})
        if (FindCart) {
                res.status(200).json({
                    success: true,
                    message: "Got data of the cart",
                    data: FindCart
                })
        }else {
            res.status(400).json({
                success: false,
                message: "invalid userId"
            })
        }
    } catch (error) {        
        res.status(500).json({
            success: false,
            message:error.message
        })
    }
}