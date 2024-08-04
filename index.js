const http = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');

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


app.get('/user', userRoutes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

module.exports = app;