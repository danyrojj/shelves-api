const express = require('express');
const {allocate} =  require('./src/routes/index');
const {shelves} = require('./src/service/shelve-service');

const app = express();
app.use(express.json());

app.use(allocate)

app.get('/', (req, res) => {
    res.send(shelves);
  });
  
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });