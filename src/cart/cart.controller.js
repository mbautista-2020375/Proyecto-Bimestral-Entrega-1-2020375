'use strict';

import Cart from "./cart.model.js";
import Product from "../product/product.model.js"

export const addProductToCart = async (req, res) => {
  console.log("Cart Controller: ");
  console.log("-> Adding product to cart...");
  try {
    const {uid} = req.user;
    const { productId, quantity } = req.body;

    if (quantity <= 0) {
      console.log("-> Quantity must be greater than 0.");
      return res.status(400).send({
        message: "Cart Controller -> Quantity must be greater than 0.",
        success: false,
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      console.log("-> Product not found.");
      return res.status(404).send({
        message: "Cart Controller -> Product not found.",
        success: false,
      });
    }

    let cart = await Cart.findOne({ user: uid });

    if (!cart) {
      cart = new Cart({
        user: uid,
        products: [{ product: productId, quantity }],
      });
    } else {
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
      if (productIndex >= 0) {
        cart.products[productIndex].quantity = Number(cart.products[productIndex].quantity) + Number(quantity);
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();
    console.log("-> Product added to cart successfully.");
    return res.send({
      message: "Cart Controller -> Product added to cart successfully.",
      success: true,
      cart,
    });
  } catch (error) {
    console.error("-> An unexpected error occurred while adding product to cart.", error);
    return res.status(500).send({
      message: "Cart Controller -> An unexpected error occurred while adding product to cart.",
      success: false,
      error,
    });
  }
};

export const getUserCart = async (req, res) => {
  console.log("Cart Controller: ");
  console.log("-> Fetching user cart...");
  try {
    const {uid} = req.user;
    const cart = await Cart.findOne({ user: uid }).populate("products.product", "name price");

    if (!cart) {
      console.log("-> Cart not found.");
      return res.status(404).send({
        message: "Cart Controller -> Cart not found.",
        success: false,
      });
    }

    console.log("-> Cart retrieved successfully.");
    return res.send({
      message: "Cart Controller -> Cart retrieved successfully.",
      success: true,
      cart,
    });
  } catch (error) {
    console.error("-> An unexpected error occurred while fetching user cart.", error);
    return res.status(500).send({
      message: "Cart Controller -> An unexpected error occurred while fetching user cart.",
      success: false,
      error,
    });
  }
};

export const updateProductQuantity = async (req, res) => {
  console.log("Cart Controller: ");
  console.log("-> Updating product quantity in cart...");
  try {
    const {uid} = req.user;
    const { productId, quantity } = req.body;

    if (quantity <= 0) {
      console.log("-> Quantity must be greater than 0.");
      return res.status(400).send({
        message: "Cart Controller -> Quantity must be greater than 0.",
        success: false,
      });
    }

    const cart = await Cart.findOne({ user: uid });
    if (!cart) {
      console.log("-> Cart not found.");
      return res.status(404).send({
        message: "Cart Controller -> Cart not found.",
        success: false,
      });
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if (productIndex >= 0) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      console.log("-> Product quantity updated successfully.");
      return res.send({
        message: "Cart Controller -> Product quantity updated successfully.",
        success: true,
        cart,
      });
    } else {
      console.log("-> Product not found in cart.");
      return res.status(404).send({
        message: "Cart Controller -> Product not found in cart.",
        success: false,
      });
    }
  } catch (error) {
    console.error("-> An unexpected error occurred while updating product quantity.", error);
    return res.status(500).send({
      message: "Cart Controller -> An unexpected error occurred while updating product quantity.",
      success: false,
      error,
    });
  }
};

export const removeProductFromCart = async (req, res) => {
  console.log("Cart Controller: ");
  console.log("-> Removing product from cart...");
  try {
    const {uid} = req.user;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: uid });
    if (!cart) {
      console.log("-> Cart not found.");
      return res.status(404).send({
        message: "Cart Controller -> Cart not found.",
        success: false,
      });
    }

    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    await cart.save();
    console.log("-> Product removed from cart successfully.");
    return res.send({
      message: "Cart Controller -> Product removed from cart successfully.",
      success: true,
      cart,
    });
  } catch (error) {
    console.error("-> An unexpected error occurred while removing product from cart.", error);
    return res.status(500).send({
      message: "Cart Controller -> An unexpected error occurred while removing product from cart.",
      success: false,
      error,
    });
  }
};

export const clearCart = async (req, res) => {
  console.log("Cart Controller: ");
  console.log("-> Clearing cart...");
  try {
    const {uid} = req.user;

    const cart = await Cart.findOne({ user: uid });
    if (!cart) {
      console.log("-> Cart not found.");
      return res.status(404).send({
        message: "Cart Controller -> Cart not found.",
        success: false,
      });
    }

    cart.products = [];
    await cart.save();
    console.log("-> Cart cleared successfully.");
    return res.send({
      message: "Cart Controller -> Cart cleared successfully.",
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected error occurred while clearing the cart.", error);
    return res.status(500).send({
      message: "Cart Controller -> An unexpected error occurred while clearing the cart.",
      success: false,
      error,
    });
  }
};
