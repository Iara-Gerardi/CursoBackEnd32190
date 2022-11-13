const fs = require('fs');
const path = require('path');
const express = require('express');

const viewPath = path.join(__dirname, '.././public/index.html');

const getSubmitForm = (req, res) => {
  res.sendFile(viewPath);
}

module.exports = getSubmitForm;