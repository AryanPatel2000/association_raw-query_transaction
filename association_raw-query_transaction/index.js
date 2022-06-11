require('dotenv').config()
const express = require('express');
const app = express()


app.use(express.urlencoded({extended:false}));
app.use(express.json());


let router = require('./src/routes/customer.route')
app.use('/', router)


const sequelize = require('./src/config/db.config')

 const Customer = require('./src/model/customer.model');
 const Order = require('./src/model/order.model')

// sequelize.sync({force:true})
// .then( () => {
//     console.log(`Table sync with { alter: true}`)
// })

const port = process.env.PORT || 4000;
app.get('/', (req, res) => {
    res.send('Working...')
})


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})
