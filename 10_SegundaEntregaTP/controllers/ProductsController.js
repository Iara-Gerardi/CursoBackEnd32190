const express = require("express");
const { MongoDBClass } = require("../data/MongoDB");
const productSchema = require("../data/models/productsModel");

const admin = true;

const products = new MongoDBClass(productSchema);

const getProducts = async (req, res) => {
  try {
    const allProducts = await products.GetAll().then(() => {
      return {
        message: "Get all products method executed successfully",
        data: allProducts,
      };
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await products.GetByID(req.params.id).then(() => {
      return {
        message: "Get product method executed successfully",
        data: product,
      };
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// Admin methods
const editProduct = async (req, res) => {
  if (!admin)
    return res.status(400).json({ error: "Method availeable only for admins" });

  const { timestamp, name, description, code, photo, price, stock } = req.body;

  try {
    const editedProduct = await products
      .EditByID(
        { timestamp, name, description, code, photo, price, stock },
        req.params.id
      )
      .then(() => {
        return { message: "Product edited successfully", data: editedProduct };
      });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const addProduct = async (req, res) => {
  if (!admin)
    return res.status(400).json({ error: "Method availeable only for admins" });

  const { timestamp, name, description, code, photo, price, stock } = req.body;

  try {
    const newProduct = await products
      .Save({ timestamp, name, description, code, photo, price, stock })
      .then(() => {
        return { message: "Product saved successfully", data: newProduct };
      });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const deleteProduct = async (req, res) => {
  if (!admin)
    return res.status(400).json({ error: "Method availeable only for admins" });

  try {
    const deletedProduct = await products.DeleteByID(req.params.id).then(() => {
      return {
        message: `The product with the ID ${ID} has been deleted`,
        data: deletedProduct,
      };
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = {
  getProducts,
  getProductById,
  editProduct,
  addProduct,
  deleteProduct,
};
