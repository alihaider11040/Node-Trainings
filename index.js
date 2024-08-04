const http = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const mongoose = require('mongoose');


var app = express();

const userRoutes = require('./Routes/user.routes');
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!\n');
// });
//dummy 

//task 1 - name customized URL.
// localhost:3000/Ali
app.get('/Ali', (req, res) => {
  res.send('Hello Ali!')
})
// localhost:3000/user
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//task 2 - name customized URL.

// user/create - POST
app.get('/user', userRoutes);

mongoose.connect("mongodb+srv://alihaider11040:<password>@mern.jv8z27i.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

module.exports = app;