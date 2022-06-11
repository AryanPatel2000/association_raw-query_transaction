const Sequelize = require('sequelize')

const sequelize = require('../config/db.config')

const Order = sequelize.define('order',
{

   product: {
       type: Sequelize.STRING,
       allowNull: false,
   },
 

}, {
       timestamps:false,
        freezeTableName:true
})

module.exports = Order
