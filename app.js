const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const path = require('path');
const express = require("express");
const app = express();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

const users = require("./routes/api/users");
const languages = require("./routes/api/languages");
const problems = require('./routes/api/problems')
const solutions = require('./routes/api/solutions')
const shared_spaces = require('./routes/api/shared_space')

const ApplyJwtToPass = require('./config/passport')
const passport = require('passport');

ApplyJwtToPass(passport);



var server = require('http').createServer(app);

mongoose
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to MongoDB successfully")
    const seed = require('./models/seed')
})
.catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// SOCKETS
var io = require('socket.io')(server);
var ot = require('ot');
var str = "// Code it in JS \n\n";

// OT
var spaceList = {};
io.on('connection', function(socket) {
    
    socket.on('joinSpace', function(data) {
      if (!spaceList[data.spaceId]) {
        var socketIOServer = new ot.EditorSocketIOServer(str, [], data.spaceId, function(socket, cb) {
          cb(true);
        });
        spaceList[data.spaceId] = socketIOServer;
      }
      spaceList[data.spaceId].addClient(socket);
      spaceList[data.spaceId].setName(socket, data.userId);
      socket.join(`${data.spaceId}doc`);
    });

    socket.on('join', function(data){
      console.log("joineeed", data)
      socket.join(data.spaceId)
      socket.broadcast.to(data.spaceId).emit('userJoined', data)
    })

    // White board
    // need to be changed
    socket.on('disconnect', function() {
      socket.leave("colll");
    });

    socket.on('drawLine', function(data){
      // io.sockets.in(data.spaceId).emit('drawLine', data)
      // console.log(data)
      socket.broadcast.to(data.spaceId).emit('drawLine', data)
      // socket.broadcast.emit('drawLine', data)
    })

    socket.on('eraseWhiteBoard', function(){
      // io.sockets.in(data.spaceId).emit('eraseWhiteBoard', true)
      socket.broadcast.to(data.spaceId).emit('eraseWhiteBoard', true)

      // socket.broadcast.emit('eraseWhiteBoard', true)
    })

    socket.on( 'changeColor' , function(data){
      // io.sockets.in(data.spaceId).emit('changeColor', data)
      socket.broadcast.to(data.spaceId).emit('changeColor', data)
      
      // socket.broadcast.emit('changeColor', data)
    })

    socket.on( 'drawRect' , function(data){
      // io.sockets.in(data.spaceId).emit('drawRect', data)
      socket.broadcast.to(data.spaceId).emit('drawRect', data)

      // socket.broadcast.emit('drawRect', data)
    })
    socket.on( 'endRect' , function(data){
      // io.sockets.in(data.spaceId).emit('endRect', data)
      socket.broadcast.to(data.spaceId).emit('endRect', data)

      // socket.broadcast.emit('endRect', data)
    })

})

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server is running on port ${port}`));



app.use("/api/users", users);
app.use("/api/problems", problems);
app.use("/api/solutions", solutions);
app.use("/api/languages", languages);
app.use("/api/shared_spaces", shared_spaces);