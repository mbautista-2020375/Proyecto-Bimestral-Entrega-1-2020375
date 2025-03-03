'use strict';

import Bill from "./bill.model.js";
import Cart from "../cart/cart.model.js";
import Product from "../product/product.model.js"
import mongoose from "mongoose";

export const createBill = async (req, res) => {
    console.log("Bill Controller: ");
    console.log("-> Creating a new bill...");
    try {
        const { cartId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(400).send({
                message: "Bill Controller -> Invalid cart ID provided.",
                success: false
            });
        }

        const cart = await Cart.findById(cartId).populate('products.product');

        if (!cart) {
            return res.status(404).send({
                message: "Bill Controller -> Cart not found.",
                success: false
            });
        }

        if (cart.products.length === 0) {
            return res.status(400).send({
                message: "Bill Controller -> Cart is empty, cannot create bill.",
                success: false
            });
        }
        let currentProduct = new Product()
        const total = cart.products.reduce((sum, item) => {
            currentProduct = Product.findOne({name: item.product.name})
            currentProduct.sold += item.quantity;
            return sum + (item.product.price * item.quantity);
        }, 0);

        const newBill = new Bill({
            cart: cart._id,
            total,
            status: 'pending'
        });

        await newBill.save();

        console.log("-> Bill successfully created.");
        return res.send({
            message: "Bill Controller -> Bill successfully created.",
            success: true,
            bill: newBill
        });

    } catch (error) {
        console.error("-> An unexpected error occurred while creating the bill.", error);
        return res.status(500).send({
            message: "Bill Controller -> An unexpected error occurred while creating the bill.",
            success: false,
            error
        });
    }
};

export const getAllBills = async (req, res) => {
    console.log("Bill Controller: ");
    console.log("-> Fetching all bills...");
    try {
        const bills = await Bill.find()
            .populate({
                path: 'cart',
                populate: {
                    path: 'products.product',
                    select: 'name price'
                }
            });

        if (bills.length === 0) {
            console.log("-> No bills found.");
            return res.status(404).send({
                message: "Bill Controller -> No bills found.",
                success: false
            });
        }

        console.log("-> Bills found and retrieved successfully.");
        return res.send({
            message: "Bill Controller -> Bills found and retrieved successfully.",
            success: true,
            bills
        });

    } catch (error) {
        console.error("-> An unexpected error occurred while fetching bills.", error);
        return res.status(500).send({
            message: "Bill Controller -> An unexpected error occurred while fetching bills.",
            success: false,
            error
        });
    }
};

export const getBillById = async (req, res) => {
    console.log("Bill Controller: ");
    console.log("-> Fetching bill by ID...");
    try {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                message: "Bill Controller -> Invalid ID format provided.",
                success: false
            });
        }

        const bill = await Bill.findById(id)
            .populate({
                path: 'cart',
                populate: {
                    path: 'products.product',
                    select: 'name price'
                }
            });

        if (!bill) {
            console.log("-> Bill not found with the given ID.");
            return res.status(404).send({
                message: "Bill Controller -> Bill not found with the given ID.",
                success: false
            });
        }

        console.log("-> Bill successfully found.");
        return res.send({
            message: "Bill Controller -> Bill successfully found.",
            success: true,
            bill
        });

    } catch (error) {
        console.error("-> An unexpected error occurred while fetching the bill by ID.", error);
        return res.status(500).send({
            message: "Bill Controller -> An unexpected error occurred while fetching the bill by ID.",
            success: false,
            error
        });
    }
};

export const updateBill = async (req, res) => {
    console.log("Bill Controller: ");
    console.log("-> Updating bill...");
    try {
        const {id} = req.params;
        const data = req.body;

        const updatedBill = await Bill.findByIdAndUpdate(id, data, { new: true })
            .populate({
                path: 'cart',
                populate: {
                    path: 'products.product',
                    select: 'name price'
                }
            });

        if (!updatedBill) {
            console.log("-> Bill not found for update.");
            return res.status(404).send({
                message: "Bill Controller -> Bill not found for update.",
                success: false
            });
        }

        console.log("-> Bill updated successfully.");
        return res.send({
            message: "Bill Controller -> Bill updated successfully.",
            success: true,
            updatedBill
        });

    } catch (error) {
        console.error("-> An unexpected error occurred while updating the bill.", error);
        return res.status(500).send({
            message: "Bill Controller -> An unexpected error occurred while updating the bill.",
            success: false,
            error
        });
    }
};

export const deleteBill = async (req, res) => {
    console.log("Bill Controller: ");
    console.log("-> Deleting bill...");
    try {
        const {id} = req.params;

        const deletedBill = await Bill.findByIdAndDelete(id);

        if (!deletedBill) {
            console.log("-> Bill not found for deletion.");
            return res.status(404).send({
                message: "Bill Controller -> Bill not found for deletion.",
                success: false
            });
        }

        console.log("-> Bill successfully deleted.");
        return res.send({
            message: "Bill Controller -> Bill successfully deleted.",
            success: true
        });

    } catch (error) {
        console.error("-> An unexpected error occurred while deleting the bill.", error);
        return res.status(500).send({
            message: "Bill Controller -> An unexpected error occurred while deleting the bill.",
            success: false,
            error
        });
    }
};
