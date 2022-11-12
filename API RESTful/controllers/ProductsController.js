const path = require('path');
const express = require('express');

const classPath = path.join(__dirname, '../../' + '/2_ManejoDeArchivos/ManejoDeArchivos.js');
const jsonPath = path.join(__dirname, '../' + '/data/data.json');

const { fileClass } = require(classPath)
const fileProds = new fileClass(jsonPath);

const getProducts = async (req, res) => {
    try {
        const allProducts = fileProds.GetAll();
        res.json({ message: 'success', data: allProducts });
    } catch (err) {

    }

}

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

}

const editProduct = async (req, res) => {

}

const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const product = fileProds.DeleteByID(id);
        console.log(product)
        if (product === null) return res.status(400).json({ message: 'error producto no encontrado' })
        return res.json({ message: 'success', data: product })
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