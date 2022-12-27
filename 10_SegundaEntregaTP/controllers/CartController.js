const express = require("express");
const { MongoDBClass } = require("../data/MongoDB");
const cartSchema = require("../data/models/cartModel");

const cart = new MongoDBClass(cartSchema);

const createCart = async (req, res) => {
  try {
    const data = cart.Save({ timestamp: Date.now(), products: [] });

    return res.json({ message: "Cart added successfully", data: data });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getCart = async (req, res) => {
  try {
    
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const deleteCart = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const addToCart = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const deleteFromCart = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = { createCart, getCart, deleteCart, addToCart, deleteFromCart };
