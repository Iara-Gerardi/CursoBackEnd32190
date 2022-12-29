const express = require("express");
const Firebase = require("../data/Firebase");

const cart = new Firebase('carts')

const createCart = async (req, res) => {
  try {
    const newCart = cart.Save({ timestamp: Date.now(), products: [] });
    return res.json({ message: "Cart added successfully", data: newCart });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await products.GetByID(req.params.id).then(() => {
      return {
        message: "Get product method executed successfully",
        data: cart,
      };
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const deleteCart = async (req, res) => {
  try {
    const deletedCart = await products.DeleteByID(req.params.id).then(() => {
      return {
        message: `The cart with the ID ${ID} has been deleted`,
        data: deletedCart,
      };
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const addToCart = async (req, res) => {
  const { timestamp, name, description, code, photo, price, stock } = req.body;

  try {
    const newProduct = await products
    .AddTo(req.params.id, { timestamp, name, description, code, photo, price, stock })
    .then(() => {
      return { message: "Product saved successfully", data: newProduct };
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const deleteFromCart = async (req, res) => {
  try {
  } catch (err) {
    const deletedProduct = await products.DeleteFrom(req.params.id, req.params.id_prod).then(() => {
      return {
        message: `The product with the ID ${ID} has been deleted`,
        data: deletedProduct,
      };
    });
    return res.status(500).json({ error: err });
  }
};

module.exports = { createCart, getCart, deleteCart, addToCart, deleteFromCart };
