const path = require('path');
const express = require('express');

const classPath = path.join(__dirname, '../../' + '/2_ManejoDeArchivos/ManejoDeArchivos.js');
const jsonPath = path.join(__dirname, '../' + '/data/data.json');

const { fileClass } = require(classPath)
const fileProds = new fileClass(jsonPath);

const getProducts = async (req, res) => {
    try {
        const allProducts = fileProds.GetAll();
        return res.json({ message: 'success', data: allProducts });
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

const getProductByID = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const product = fileProds.GetByID(id);
        if (product === null) return res.status(400).json({ message: 'error producto no encontrado' })
        return res.json({ message: 'success', data: product })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

const addProduct = async (req, res) => {
    const { title, price } = req.body
    const thumbnail = req.file
    const filename = thumbnail.filename
    if (!title || !price || !thumbnail) return res.status(400).json({ error: "all fields required" });
    try {
        const newProd = { title, price, thumbnail: filename };
        const product = fileProds.save(newProd);
        console.log(product)
        return res.json({ message: 'success', data: product });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

const editProduct = async (req, res) => {
    const { id } = req.params
    const { title, price } = req.body

    try {
        if (!id || !title || !price) return res.status(400).json({ error: "all fields required" });
        const editedObject = { id, title, price };
        const product = fileProds.EditByID(editedObject);
        return res.json({ data: product });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const product = fileProds.DeleteByID(id);
        // console.log(product)
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