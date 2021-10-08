const express = require('express')
const app = express()
const env = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyparser = require('body-parser');

  // routers
const userRoutes = require('./router/auth')
const currencyRoutes = require('./router/Currency')
const orderRoutes = require('./router/orders')
const tradeRoutes = require('./router/history')


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


app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})