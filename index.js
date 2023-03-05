const express = require('express');
const {allocate} =  require('./src/routes/index');

const app = express();
app.use(express.json());

app.use(allocate)

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });