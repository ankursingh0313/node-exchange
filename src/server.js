const express = require('express');
const app = express();
const env = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const userRoutes = require('./router/auth');
const currencyRoutes = require('./router/Currency');
const orderRoutes = require('./router/orders');
const tradeRoutes = require('./router/history')
const testing = require('./router/testing');


env.config();


mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.jcbia.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => { console.log('Database Connected') })


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
app.use('/api', testing);


app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})

/**
 * Socket Server Code
 */
const { Server } = require("socket.io");
const { createServer } = require("http");
const uuid = require("uuid");
const { isValidUser } = require('./utils.socket/validator');
const { getRoomByAccessToken, getArrayFromMapObjectArray } = require('./utils.socket/functions');
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

const clients = new Map();
const sell_order_stack = new Map();
const buy_order_stack = new Map();
const order_history = new Map();
/**
 *  client code to send credentials
 *    const socket = io({
 *      auth: {
 *        token: "abc"
 *      }
 *    });
 */
io.use((socket, next) => {
    if (isValidUser(socket)) {
        console.log("valid access token: ", { "access_token": socket.handshake.auth.token, "id": socket.id });
        next();
    } else {
        console.log("invalid access token: ", { "access_token": socket.handshake.auth.token, "id": socket.id  })
        next(new Error("invalid request"));
    }
});
// check connection error
io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
});


// connection event 
io.on("connection", (socket) => {
    let access_token = socket.handshake.auth.token;
    let room_name = getRoomByAccessToken(access_token);
    socket.join(room_name);

    clients.set(socket.id, access_token);

    console.log("A socket client is connected with Access Token: ", access_token); 

    socket.emit('welcome', { "message": 'You are connected to the server!' });

    // console.log("rooms", io.of("/").adapter.rooms);

    socket.on("disconnect", () => {
        console.log("Client Disconnected!");
    });

    socket.on('update_order_history', (data) => {
        if (socket.rooms.has('feeder')) {
            if (data.currency_type && data.compare_currency && data.raw_price && data.volume) {
                let title = data.currency_type + data.compare_currency;
                if (order_history.get(title)) {
                    let old_arr = order_history.get(title)
                    let new_arr = old_arr.slice(Math.max(old_arr.length - 9, 0))
                    order_history.set(title, [...new_arr, data]);
                } else {
                    order_history.set(title, [data]);
                }
            }

            let arr = getArrayFromMapObjectArray(order_history);

            socket.to('eater').emit('order_history_updated', arr);
            console.log("history updated");
        } else {}
    })

    socket.on('update_sell_stack', async(data) => {
        if (socket.rooms.has('feeder')) {
            if (data.currency_type && data.compare_currency && data.raw_price && data.volume) {
                let title = data.currency_type + data.compare_currency;
                if (sell_order_stack.get(title)) {
                    let old_arr = sell_order_stack.get(title)
                    let new_arr = old_arr.slice(Math.max(old_arr.length - 9, 0))
                    sell_order_stack.set(title, [...new_arr, data]);
                } else {
                    sell_order_stack.set(title, [data]);
                }
            }
            console.log("buy_order_stack", sell_order_stack.get(data.currency_type + data.compare_currency))

            let arr = getArrayFromMapObjectArray(sell_order_stack);

            socket.to('eater').emit('sell_order_updated', arr);

            console.log("sell_stack updated");
        } else { }
    })

    socket.on('update_buy_stack', (data) => {
        if (socket.rooms.has('feeder')) {
            if (data.currency_type && data.compare_currency && data.raw_price && data.volume) {
                let title = data.currency_type + data.compare_currency;
                if (buy_order_stack.get(title)) {
                    let old_arr = buy_order_stack.get(title)
                    let new_arr = old_arr.slice(Math.max(old_arr.length - 9, 0))
                    buy_order_stack.set(title, [...new_arr, data]);
                } else {
                    buy_order_stack.set(title, [data]);
                }
            }

            let arr = getArrayFromMapObjectArray(buy_order_stack);

            socket.to('eater').emit('buy_order_updated', arr);
            console.log("buy_stack updated");
        } else { }
    })

});

// server starting
httpServer.listen(5007, () => console.log("Socker Server is Started on PORT: ", 5007));