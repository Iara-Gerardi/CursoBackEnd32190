const fs = require('fs');
const path = require('path');
const express = require('express');

const admin = true;

const jsonPath = path.join(__dirname, '../' + '/data/cart.json');

const { fileClass } = require('../../2_ManejoDeArchivos/ManejoDeArchivos');
const fileCart = new fileClass(jsonPath);

const createCart = async (req, res) => {
  try {
    const cart = fileProds.save({ timestamp: Date.now(), products: [] });

    return res.json({ message: 'success', data: cart });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

const getCart = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const cart = fileCart.GetByID(id);
    if (cart === null) return res.status(400).json({ message: 'carrito no encontrado' })
    return res.json({ message: 'success', data: cart })
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

const deleteCart = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const cart = fileCart.DeleteByID(id);
    if (cart === null) return res.status(400).json({ message: 'error producto no encontrado' })
    return res.json({ message: 'success', data: { cartID: cart } })
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

const addToCart = async (req, res) => {

}

const deleteFromCart = async (req, res) => {

}

module.exports = { createCart, getCart, deleteCart, addToCart, deleteFromCart }