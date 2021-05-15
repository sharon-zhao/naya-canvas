var app = require('express')();
var mongoose = require('mongoose');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var cors = require('cors');
// var db = require('./config/db')
var userRoutes = require('./routes/user_routes')

app.use(cors())
app.use(userRoutes)
io.on('connection', (socket) => {
  // canvas-data == to the board emit variable
  socket.on('canvas-data', (data) => {
    socket.broadcast.emit('canvas-data', data);
  })
})

var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
http.listen(server_port, () => {
  console.log('started on: ' + server_port);
})

mongoose
  .connect("mongodb://localhost/naya-studio", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => console.error("Connection error", err));
