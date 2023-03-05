const express = require('express');
const app = express();

app.post('/allocateCell', (req, res) => {
    const { productId, quantity } = req.body;
  
    // perform some logic to allocate a cell for the given product and quantity
    const foundCell = true;
    const cell = '0,0';
  
    res.json({ foundCell, cell });
  });
  



  module.exports = app;