const Customer = require('../model/customer.model');
const Order = require('../model/order.model')
const db = require('../config/db.config');
const { sequelize, QueryTypes } = require('sequelize');


exports.createCustomer = async(req, res) => {

  const t = await Customer.sequelize.transaction();
    const customer = {
         email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            city : req.body.city,
      };

      await Customer.create(customer, { transaction: t })

      .then(data => {
        t.commit();
        res.send(data);
      })
      .catch(err => {
        t.rollback();
        res.status(500).send({ message:err.message  });
      });
    

}

module.exports.createOrder = async(req, res) => {
  const t = await Order.sequelize.transaction();
    const order = {
       product:req.body.product,
       customerId: req.body.customerId
      };

    await  Order.create(order,  { transaction: t })
      .then(result => {    
          
        t.commit();
        res.status(200).json({
            message: "Upload Successfully a Customer with id = " + result.id,
            Customer: result,
            })

         })
      .catch(err => {
        t.rollback();
        res.status(500).send({ message:err.message });
      });
}

module.exports.getCustomer = async(req,res) => {
  const t = await Customer.sequelize.transaction();

     Customer.findAll({
      include: { model: Order, as: 'order' },
     
    },  {transaction :t})

   .then(result => {
    t.commit();
      return res.status(200).send({result });
    })
    .catch(err => {
      t.rollback();
      res.status(500).send({ message:err.message });
    });

};

module.exports.getOrder = async(req,res) => {

  const t = await Order.sequelize.transaction();
  await db.query('SELECT * FROM `order` ', { type: QueryTypes.SELECT}, {transaction :t})

  .then(result => {
    t.commit();
    return res.status(200).send({result });
  })
  .catch((err) => {
    t.rollback();
    res.status(500).send({ err:message });
  });

};

module.exports.findById = async(req, res) => {

  await db.query('SELECT * FROM customer WHERE id = ?',
  {
    replacements:[req.params.id],
    type:QueryTypes.SELECT
  })
  .then( (data) => {
    res.status(200).send({result:data})
  })
  .catch( err => { 
    res.status(500).send({ message:err.message });
  })
  
}

module.exports.deleteCustomer =async(req, res) => {

  db.query('DELETE FROM `customer` WHERE id='+ req.params.id)
  .then( () => {
    res.send({message:'delete customer'})
  })
  .catch( (err) => {
    res.send({message:err})
  })
     
 }
 module.exports.deleteOrder =async(req, res) => {

  db.query('DELETE FROM `order` WHERE id='+ req.params.id)
  .then( () => {
    res.send({message:'Order delete'})
  })
  .catch( (err) => {
    res.send({message:err})
  })
     
 }

module.exports.updateCustomer = async(req, res) => {
   
   Customer.update({ email: req.body.email, firstName:req.body.firstName, lastName:req.body.lastName, city:req.body.city}, 
      { where: {id: req.params.customerId} }
      ).then( () => {
          res.status(200).send({ message: 'updated successfully '});
      })
      .catch( (err) => { res.send({message:err})});

  
}

