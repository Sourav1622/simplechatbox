const express = require("express");
const app = express();
const http = require('http').createServer(app);

app.use(express.static(__dirname+"/public"))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})
//socket 
const io = require("socket.io")(http);
io.on('connection',(socket)=>{
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
    })
})

const port = process.env.POST || 3000;
http.listen(port,()=>{console.log(`server running at ${port}`)})