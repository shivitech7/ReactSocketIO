// var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
    });

var cors = require('cors')

app.use(cors())
const PORT = 3001;
// const header = ('Access-Control-Allow-Origin: *');

app.get("/", (req,res)=>{
    res.send('hello world');
});

io.on('connection', (socket)=>{                    //server listner
    console.log("a user connected");
    socket.on('chat message', (msg)=>{
        console.log('message: ' + JSON.stringify(msg));
        io.emit('chat message', msg);
        // io.set('transports', ['xhr-polling']);
    });
    // socket.on('error', (error)=>{
    //     console.log(error);
    // });
});


http.listen(PORT, ()=> console.log(`server initialized at http://localhost/${PORT}`));
