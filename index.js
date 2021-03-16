const express = require('express')


// App setup
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
/* var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
}); */

// Static files
app.use(express.static('public'));

// Socket setup & pass server
/* var socket = require('socket.io');
var io = socket(server); */
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('chat', (data) => {
      socket.broadcast.emit('chat', data)
    })

    // Handle chat event
  /*   socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    }); */

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
