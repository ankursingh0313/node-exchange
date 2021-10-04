const express = require('express');
const app = express();
const mysql = require('mysql');
 
const config = require('./models/config')
  
   const userRoutes = require('./router/auth')



   app.use(express.json());

  // app.use(
  //   cors({
  //     origin: "*",
  //   })
  // );

 app.use('/api', userRoutes)


app.get('/', async (req ,res) => {
//   config.query('SELECT * FROM crypto_transaction_history', function (err, recordset) {
//         if (err) console.log(err)
//         res.send(recordset);
        
    // });



});

app.get("/login", (req, res) =>{

  
});


const PORT = process.env.PORT || 3000;
 app.listen(PORT,() => {
     console.log(`server working on ${PORT}`)
 })