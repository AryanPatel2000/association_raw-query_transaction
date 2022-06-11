const db = require('../config/db.config');
const Customer = require('../model/customer.model');

module.exports =checkDuplicateCustomer = (req, res, next) => {

    //check email
    Customer.findOne({ 
            where: {
                email: req.body.email
            }
    }).then( customer => {
        if(customer){
           return res.status(400).send({error:true, message: "Failed!  email is already in use!"})
           
        }
        else{

            try{
        
        Customer.email = req.body.email;
        Customer.firstName = req.body.firstName;
        Customer.lastName = req.body.lastName;
        Customer.city = req.body.city;
        
        
        Customer.create(Customer).then(result => {    
           
            res.status(200).json({
                message: "Upload Successfully a Customer with id = " + result.id,
                Customer: result,
            });
           
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
           
        }
    })

}

