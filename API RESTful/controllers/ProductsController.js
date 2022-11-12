const path = require('path');
const express = require('express');

const classPath = path.join(__dirname, '../../' + '/2_ManejoDeArchivos/ManejoDeArchivos.js');
const jsonPath = path.join(__dirname, '../' + '/data/data.json');

const { fileClass } = require(classPath)
const fileProds = new fileClass(jsonPath);

// Metodo probado
const getProducts = async (req, res) => {
    try {
        const allProducts = fileProds.GetAll();
        return res.json({ message: 'success', data: allProducts });
    } catch (err) {
        return res.status(500).json({ error: err })
    }

}

// Metodo probado
const getProductByID = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const product = fileProds.GetByID(id);
        console.log(product)
        if (product === null) return res.status(400).json({ message: 'error producto no encontrado' })
        return res.json({ message: 'success', data: product })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

const addProduct = async (req, res) => {
    const { title, price, thumbnail } = req.body
    console.log(req.body)
    if (!title || !price || !thumbnail) return res.status(400).json({ error: "all fields required" });
    try {
        const newProd = { title, price, thumbnail };
        const product = fileProds.save(newProd);
        return res.json({ message: 'success', data: product });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

const editProduct = async (req, res) => {
    const { id, title, price, thumbnail } = req.body
    try {
        if (!id || !title || !price || !thumbnail) return res.status(400).json({ error: "all fields required" });
        const editedObject = { id, title, price, thumbnail };
        const product = fileProds.EditByID(editedObject);
        return res.json({ message: 'success', data: product });
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

// Metodo probado
const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const product = fileProds.DeleteByID(id);
        console.log(product)
        if (product === null) return res.status(400).json({ message: 'error producto no encontrado' })
        return res.json({ message: 'success', data: { productID: product } })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

module.exports = {
    getProducts,
    getProductByID,
    addProduct,
    editProduct,
    deleteProduct
}