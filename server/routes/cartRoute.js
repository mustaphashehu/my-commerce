const express = require("express")
const router = express.Router()

const { addToCart,
    getCart,
    removeFromCart,
    payForCart,
    getTheCart,
    pay
 } = require("../controllers/cartController")

//  const {
//     authenticateUser,
//     authorizeUser,
//     authorizeGettingSingleUSer
// } = require("../middlewares/unAuthorized")

router.route("/").post(addToCart).get(getCart);
router.route("/pay").post(pay)
router.route("/theorders").get(getTheCart);
// router.route("/:productId").get(getCartItem);
router.route("/:productId").delete(removeFromCart);
router.route("/pay").post(payForCart);


module.exports = router