const app = require('express')();

const server = require('http').createServer(app);

const io = require('socket.io')(server);

io.on("connection",(socket)=>{
    console.log(socket);
    console.log("Connection is started by nodemon...");

    socket.on("chat" , (payload)=>{
        console.log(payload);
        io.emit("chat",payload);
    })
});

server.listen(5000, ()=> console.log("server is active..."));