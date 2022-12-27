const express = require('express');

const admin = true;

const jsonPath = path.join(__dirname, '../' + '/data/products.json');

const { fileClass } = require('../../2_ManejoDeArchivos/ManejoDeArchivos');
const fileProds = new fileClass(jsonPath);

const getProduct = async (req, res) => {
  try {
   
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

const getProductById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
   
  } catch (err) {
    return res.status(500).json({ error: err }) 
  }
}

// Abajo, solo para admins
const editProduct = async (req, res) => {
  if (!admin) return res.status(400).json({ error: 'method availeable only for admins' });

  try {
   
  } catch (err) {
    return res.status(500).json({error: err});
  }
}

const addProduct = async (req, res) => {
  if (!admin) return res.status(400).json({ error: 'method availeable only for admins' });

  try {
  
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

const deleteProduct = async (req, res) => {
  if (!admin) return res.status(400).json({ error: 'method availeable only for admins' });

  try {
  
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

module.exports = { getProduct, getProductById, editProduct, addProduct, deleteProduct }