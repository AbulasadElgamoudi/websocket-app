const express = require('express')
const app = express();
const http = require('http')
const { Server } = require('socket.io')

const server = http.createServer(app)
const io = new Server(server)

app.use(express.static("public"))

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html')
});

io.on("connection", function(socket) {
  console.log("Connected")

  setInterval(() => {
    var spxStock = (Math.random()*100000000).toFixed(2)
    var clStock = (Math.random()*100000000).toFixed(2)
    var hsiStock = (Math.random()*100000000).toFixed(2)
  
    socket.emit('stock_update', 
    {
        priceUpdates: [
            { ticker: 'SPX', price: spxStock },
            { ticker: 'CL1', price: clStock },
            { ticker: 'HSI', price: hsiStock },
        ]
    }
    )
  }, 1000);

  socket.on("disconnect", () => {
    console.log("Disconnected")
  })
})

server.listen(3000, function() {
  console.log("Listening on port 3000")
})
