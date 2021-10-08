const express = require('express');
const http = require('http');
const app = express();
const env = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
// const WebSocket = require('ws');
  // routers
const userRoutes = require('./router/auth');
const currencyRoutes = require('./router/Currency');
const orderRoutes = require('./router/orders');
// const tradeRoutes = require('./router/trade');
// require('./socket/socket-setver');
const tradeRoutes = require('./router/history')


const map = new Map();
env.config();


   mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.jcbia.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {console.log('Database Connected')})
// app.use(
//     express.urlencoded({
//         extended: true
//     })
// )

app.use(express.json());

app.use(cors({
origin: '*'
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
// API
app.use('/api', userRoutes)
app.use('/api', currencyRoutes)
app.use('/api', orderRoutes);
app.use('/api', tradeRoutes);

// app.get("/signup", (req,res) => {
//     console.log("hello");
// res.json({status:1, msg:"signup"});
// });
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ clientTracking: false, noServer: true });
// var id = 1;
// server.on('upgrade', function (request, socket, head) {
//   console.log('Parsing session from request...');

//   // sessionParser(request, {}, () => {
//   //   if (!request.session.userId) {
//   //     socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
//   //     socket.destroy();
//   //     return;
//   //   }

//   //   console.log('Session is parsed!');

//     wss.handleUpgrade(request, socket, head, function (ws) {
//       wss.emit('connection', ws, request);
//     });
//   // });
// });
// wss.on('connection', function (ws, request) {
//   // const userId = request.session.userId;
//   map.set(id++, ws);
//   console.log("connected", request, ws)
//   ws.on('message', function (message, isbinary) {
//     //
//     // Here we can now use session parameters.
//     //
//     console.log(`Received message from user`, message, isbinary);
//     sendToAll({"status": 1});
//   });

//   ws.on('close', function () {
//     // map.delete(userId);
//     console.log('closed')
//   });
  
// });
// function sendToAll(msg) {
//   map.forEach((key, val)=> {
//     key.send(JSON.stringify({ "user_id": val, msg: msg }))
//   })
// }
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})
// server.listen(5005, function () {
//   console.log('Listening on http://localhost:5005');
// });

const { Server } = require("socket.io");
const { createServer } = require("http");
const uuid = require("uuid");
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
// io.engine.generateId = (req) => {
//   return uuid.v4(); // must be unique across all Socket.IO servers
// }
io.engine.on("connection_error", (err) => {
  console.log(err.req);      // the request object
  console.log(err.code);     // the error code, for example 1
  console.log(err.message);  // the error message, for example "Session ID unknown"
  console.log(err.context);  // some additional error context
});
io.on("connection", (socket) => {
  console.log('hi')
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

httpServer.listen(5007, ()=>console.log("connected"));