const express = require("express");

const admin = true;

const { MongoDBClass } = require("../data/MongoDB");
const cart = new MongoDBClass();

const createCart = async (req, res) => {
  try {
    const data = cart.Save({ timestamp: Date.now(), products: [] });

    return res.json({ message: "success", data: data });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getCart = async (req, res) => {
  try {
  
  } catch (err) {
  }
};

const deleteCart = async (req, res) => {
 
  try {
    
  } catch (err) {
  
  }
};

const addToCart = async (req, res) => {
 
  try {
   
  } catch (err) {
   
  }
};

const deleteFromCart = async (req, res) => {

  try {
   
  } catch (err) {
   
  }
};

module.exports = { createCart, getCart, deleteCart, addToCart, deleteFromCart };
