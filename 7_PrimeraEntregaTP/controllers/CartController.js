const fs = require("fs");
const path = require("path");
const express = require("express");

const admin = true;

const jsonPath = path.join(__dirname, "../" + "/data/cart.json");

const { fileClass } = require("../../2_ManejoDeArchivos/ManejoDeArchivos");
const fileCart = new fileClass(jsonPath);

const createCart = async (req, res) => {
  try {
    const cart = fileCart.save({ timestamp: Date.now(), products: [] });

    return res.json({ message: "success", data: cart });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

const getCart = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const cart = fileCart.GetByID(id);
    console.log(cart);
    if (cart === null)
      return res.status(400).json({ message: "carrito no encontrado" });
    return res.json({ message: "success", data: cart });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const deleteCart = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const cart = fileCart.DeleteByID(id);
    if (!cart.success)
      return res.status(400).json({ message: "error, producto no encontrado" });
    return res.json({ message: "success", data: { cartID: cart } });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const addToCart = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  try {
    const cart = fileCart.AddTo(id, {
      id,
      timestamp: Date.now(),
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    });
    if (cart === null)
      return res.status(400).json({ message: "error producto no encontrado" });
    return res.json({ message: "success", data: { cart: cart } });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const deleteFromCart = async (req, res) => {

  const id = parseInt(req.params.id);
  const id_prod = parseInt(req.params.id_prod);

  try {
    const cart = fileCart.DeleteFrom(id, id_prod);
    if (!cart.success)
      return res.status(400).json({ message: "error producto no encontrado", ee: cart.ee.products });
    return res.json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = { createCart, getCart, deleteCart, addToCart, deleteFromCart };
