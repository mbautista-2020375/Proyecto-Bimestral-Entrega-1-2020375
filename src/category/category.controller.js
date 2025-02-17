'use strict';

import Category from "./category.model.js"; // Ajusta la ruta si es necesario
import mongoose from "mongoose";


// Crear categoría
export const createCategory = async (req, res) => {
  console.log("Category Controller: ");
  console.log("-> Creating a new category...");
  try {
    const data = req.body;
    const category = new Category(data);
    await category.save();
    console.log("-> Category successfully created.");
    return res.send({
      message: "Category Controller -> Category successfully created.",
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while creating the category.", error);
    return res.status(500).send({
      message: "Category Controller -> An unexpected general error occurred while creating the category.",
      success: false,
      error,
    });
  }
};

// Obtener todas las categorías
export const getAllCategories = async (req, res) => {
  console.log("Category Controller: ");
  console.log("-> Fetching all categories...");
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      console.log("-> No categories found.");
      return res.status(404).send({
        message: "Category Controller -> No categories found.",
        success: false,
      });
    }
    console.log("-> Categories found and retrieved successfully.");
    return res.send({
      message: "Category Controller -> Categories found and retrieved successfully.",
      categories,
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while fetching categories.", error);
    return res.status(500).send({
      message: "Category Controller -> An unexpected general error occurred while fetching categories.",
      success: false,
      error,
    });
  }
};

// Obtener categoría por ID
export const getCategoryById = async (req, res) => {
  console.log("Category Controller: ");
  console.log("-> Fetching category by ID...");
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("-> Invalid ID format provided.");
      return res.status(400).send({
        message: "Category Controller -> Invalid ID format provided.",
        success: false,
      });
    }

    const category = await Category.findById(id);
    if (!category) {
      console.log("-> Category not found with the given ID.");
      return res.status(404).send({
        message: "Category Controller -> Category not found with the given ID.",
        success: false,
      });
    }

    console.log("-> Category successfully found.");
    return res.send({
      message: "Category Controller -> Category successfully found.",
      category,
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while fetching the category by ID.", error);
    return res.status(500).send({
      message: "Category Controller -> An unexpected general error occurred while fetching the category by ID.",
      success: false,
      error,
    });
  }
};

// Actualizar categoría
export const updateCategory = async (req, res) => {
  console.log("Category Controller: ");
  console.log("-> Updating category...");
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true });

    if (!updatedCategory) {
      console.log("-> Category not found for update.");
      return res.status(404).send({
        message: "Category Controller -> Category not found for update.",
        success: false,
      });
    }

    console.log("-> Category updated successfully.");
    return res.send({
      message: "Category Controller -> Category updated successfully.",
      success: true,
      updatedCategory,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while updating the category.", error);
    return res.status(500).send({
      message: "Category Controller -> An unexpected general error occurred while updating the category.",
      success: false,
      error,
    });
  }
};

// Eliminar categoría
export const deleteCategory = async (req, res) => {
  console.log("Category Controller: ");
  console.log("-> Deleting category...");
  try {
    const id = req.params.id;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      console.log("-> Category not found for deletion.");
      return res.status(404).send({
        message: "Category Controller -> Category not found for deletion.",
        success: false,
      });
    }

    console.log("-> Category successfully deleted.");
    return res.send({
      message: "Category Controller -> Category successfully deleted.",
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while deleting the category.", error);
    return res.status(500).send({
      message: "Category Controller -> An unexpected general error occurred while deleting the category.",
      success: false,
      error,
    });
  }
};
