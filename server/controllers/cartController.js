require("dotenv").config(); // Load environment variables

const { StatusCodes } = require("http-status-codes");
const Cart = require("../models/cart")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");


// Add product to cart
const addToCart = async (req, res) => {
    const { productId, price, quantity, name, postalCode, deliveryAddress, phoneNumber } = req.body;
    const the_username = req.user.name;


    const userId = req.user.userID

    let cart = await Cart.findOne({ userId });
    
    

    if (!cart) {
        if (!postalCode) return res.status(400).json({ msg: "Please provide a postal code" });
        if (!phoneNumber) return res.status(400).json({ msg: "Please provide a phone number" });
        if (!deliveryAddress) return res.status(400).json({ msg: "Please provide a delivery address" });
        cart = new Cart({ userId, username: the_username, products: [], totalPrice: 0, postalCode, deliveryAddress, phoneNumber });
    }

    const existingProduct = cart.products.find((item) => item.productId.toString() === productId);

    const location = {postalCode: cart.postalCode, deliveryAddress: cart.deliveryAddress, phoneNumber: cart.phoneNumber};
    if (postalCode) {
        location.postalCode = postalCode
    }
    if (deliveryAddress) {
        location.deliveryAddress = deliveryAddress;
    }
    if (phoneNumber) {
        location.phoneNumber = phoneNumber;
    }

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.products.push({ productId, name, price, quantity, ...location });
    }

    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();
    console.log(cart);
    
    res.status(201).json({ msg: "Product added to cart" });
};

// Get all products in a user's cart
const getCart = async (req, res) => {
    const userId = req.user.userID
    const cart = await Cart.findOne({ userId })

    if (!cart) return res.status(404).json({ msg: "Cart not found" });
    console.log(cart);

    res.status(StatusCodes.OK).json({ msg: cart });
};

const getTheCart = async (req, res) => {

    const ownerId = req.user.userID; 

    const carts = await Cart.find({ "products.productId": { $exists: true } })
        .populate({
            path: "products.productId",
            select: "name price user", 
            model: "Product"
        });

    // Filter products that belong to the logged-in owner
    const filteredProducts = [];
    carts.forEach(cart => {
        cart.products.forEach(product => {
            console.log(cart);
            
            if (product.productId && product.productId.user.toString() === ownerId) {
                const productLocation = {postalCode: cart.postalCode, deliveryAddress: cart.deliveryAddress, phoneNumber: cart.phoneNumber};

                
                if (product.postalCode) productLocation.postalCode = product.postalCode;
                if (product.deliveryAddress) productLocation.deliveryAddress = product.deliveryAddress;
                if (product.phoneNumber) productLocation.phoneNumber = product.phoneNumber;

                filteredProducts.push({
                    cartUserId: cart.userId,
                    customerName: cart.username, // User who added the product
                    productId: product.productId._id,
                    name: product.productId.name,
                    price: product.productId.price,
                    quantity: product.quantity,
                    ...productLocation
                });
            }
        });
    });

    console.log(filteredProducts);


    res.status(200).json({ msg: filteredProducts });
};



// Get a specific product from the cart
// const getCartItem = async (req, res) => {
//   const { productId } = req.params;
//   const userId = req.user.userID
//   const cart = await Cart.findOne({ userId });

//   if (!cart) return res.status(404).json({ message: "Cart not found" });

//   const product = cart.products.find((item) => item.productId.toString() === productId);

//   if (!product) return res.status(404).json({ message: "Product not found in cart" });

//   res.json(product);
// };

// Remove a product from the cart
const removeFromCart = async (req, res) => {
    const { productId } = req.params;

    const userId = req.user.userID
    let cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.products = cart.products.filter((item) => item._id.toString() !== productId);
    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();
    console.log(cart);


    res.json({ msg: cart });
};

// Pay for the cart
const payForCart = async (req, res) => {
    const { userId } = req.params;
    let cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Simulate payment process
    cart.products = [];
    cart.totalPrice = 0;

    await cart.save();
    res.json({ message: "Payment successful, cart is now empty" });
};




// Create checkout session
// const pay = async (req, res) => {
//   const userId = req.user.userID;  // Get the user ID from the authenticated session
//   const cart = await Cart.findOne({ userId });

//   if (!cart || cart.products.length === 0) {
//     return res.status(400).json({ msg: "Your cart is empty" });
//   }

//   // Prepare line items for Stripe based on the cart products
//   const line_items = cart.products.map((product) => ({
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: product.name,
//       },
//       unit_amount: product.price * 100,  // Stripe accepts amount in cents
//     },
//     quantity: product.quantity,
//   }));

//   try {
//     // Create a checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items,
//       mode: "payment",
//       success_url: `${process.env.CLIENT_URL}/payment-success`,  // Replace with your front-end URL
//       cancel_url: `${process.env.CLIENT_URL}/cart`,  // Replace with your front-end URL
//     });

//     res.json({ url: session.url });  // Send the checkout session URL
//   } catch (error) {
//     console.error("Error creating Stripe session:", error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// };





const pay = async (req, res) => {
    console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);
    
    const userId = req.user.userID;  // Get the user ID from the authenticated session
    const cart = await Cart.findOne({ userId });
  
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ msg: "Your cart is empty" });
    }
  
    // Get total price from the cart
    const totalPrice = cart.totalPrice;
  
    try {
      // Create a checkout session with totalPrice (in cents for Stripe)
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Cart Items", // Use a generic name for the cart total
              },
              unit_amount: totalPrice * 100,  // Stripe accepts amount in cents
            },
            quantity: 1,  // Only one item in the total cart
          },
        ],
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,  // Replace with your front-end URL
        cancel_url: `${process.env.CLIENT_URL}/cart`,  // Replace with your front-end URL
      });
  
      res.status(StatusCodes.OK).json({ msg: session.url });
    } catch (error) {
    //   console.error("Error creating Stripe session:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  
  // Webhook to handle Stripe payment success and update cart
  const handlePaymentSuccess = async (req, res) => {
    const { session_id } = req.query;
  
    // Retrieve the session from Stripe to confirm payment success
    const session = await stripe.checkout.sessions.retrieve(session_id);
  
    if (session.payment_status === "paid") {
      const cart = await Cart.findOne({ userId: session.customer });
  
      if (!cart) {
        return res.status(404).json({ msg: "Cart not found" });
      }
  
      // Update the cart items as paid
      for (let product of cart.products) {
        product.paid = true;
        product.paymentIntentId = session.id; // Store Stripe session ID in the product
      }
  
      // Update totalPrice to 0 (or remove it entirely if you prefer)
      cart.totalPrice = 0;
  
      await cart.save();  // Save the updated cart in the database
  
      return res.redirect(`${process.env.CLIENT_URL}/payment-success`);  // Redirect to success page
    } else {
      return res.status(400).json({ msg: "Payment failed" });
    }
  };
  

module.exports = { addToCart, getCart, removeFromCart, payForCart, getTheCart, pay, handlePaymentSuccess };




uhveyvuyhvryevyve