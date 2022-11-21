const fs = require('fs');
const path = require('path');
const express = require('express');

const postPath = path.join(__dirname, '.././public/index.html');
const editPath = path.join(__dirname, '.././public/edit.html');

const getSubmitForm = (req, res) => {
  res.sendFile(postPath);
}

const getEditForm = (req, res) => {
  res.sendFile(editPath);
}

module.exports = {
  getSubmitForm,
  getEditForm
};