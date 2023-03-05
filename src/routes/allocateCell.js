const express = require('express');
const {allocateCell,shelves} = require('../service/shelve-service');
const app = express();

app.post('/allocateCell', (req, res) => {
  
    const allocationRes = allocateCell(req.body,shelves)
  
    res.json(allocationRes);
  });
  



  module.exports = app;