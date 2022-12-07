const fs = require('fs');
const path = require('path');
const express = require('express');

const admin = true;

const jsonPath = path.join(__dirname, '../' + '/data/products.json');

const { fileClass } = require('../../2_ManejoDeArchivos/ManejoDeArchivos');
const fileProds = new fileClass(jsonPath);

const getProduct = async (req, res) => {
  try {
    const allProducts = fileProds.GetAll();
    if (allProducts.length < 1) return res.status(400).json({ message: 'error producto no encontrado' })
    return res.json({ message: 'success', data: allProducts });
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

const getProductById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const product = fileProds.GetByID(id);
    if (product?.length < 1 || product == null) return res.status(400).json({ message: 'error producto no encontrado' })
    return res.json({ message: 'success', data: product })
  } catch (err) {
    return res.status(500).json({ error: err }) 
  }
}

// Abajo, solo para admins
const editProduct = async (req, res) => {
  if (!admin) return res.status(400).json({ error: 'method availeable only for admins' });
  const { id } = req.params
  const { timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body

  try {
    if (!id || !nombre || !descripcion || !codigo || !foto || !precio || !stock) return res.status(400).json({ error: "all fields required" });
    const editedObject = { id, timestamp: Date.now(), nombre, descripcion, codigo, foto, precio, stock }
    const product = fileProds.EditByID(editedObject);
    if (product.error) throw new Error ('No existen productos con el ID ingresado')
    return res.json({ data: product });
  } catch (err) {
    return res.status(500).json({error: err});
  }
}

const addProduct = async (req, res) => {
  if (!admin) return res.status(400).json({ error: 'method availeable only for admins' });

  const { nombre, descripcion, codigo, foto, precio, stock } = req.body

  if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) return res.status(400).json({ error: "all fields required" });

  try {
    const newProd = { timestamp: Date.now(), nombre, descripcion, codigo, foto, precio, stock };
    const product = fileProds.save(newProd);
    console.log(product)
    return res.json({ message: 'success', data: product });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

const deleteProduct = async (req, res) => {
  if (!admin) return res.status(400).json({ error: 'method availeable only for admins' });
  const id = parseInt(req.params.id);
  try {
    const product = fileProds.DeleteByID(id);

    if (product === null) return res.status(400).json({ message: 'error producto no encontrado' })
    if (!product.success) return res.status(400).json({ message: product.message })
    return res.json({ message: 'success', data: { productID: product } })
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

module.exports = { getProduct, getProductById, editProduct, addProduct, deleteProduct }