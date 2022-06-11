const express = require('express');
const router = express.Router();

const controller = require('../controller/customer.controller');
const checkDuplicateCustomer = require('../middleware/customer.middleware')

router.post('/createCustomer', checkDuplicateCustomer, controller.createCustomer);
router.post('/createOrder',  controller.createOrder);
router.get('/showCustomer',  controller.getCustomer);
router.get('/showOrder',  controller.getOrder);
router.get('/:id', controller.findById);
router.delete('/deleteCustomer/:id', controller.deleteCustomer);
router.delete('/deleteOrder/:id', controller.deleteOrder);
router.put('/update/:customerId', controller.updateCustomer);




module.exports = router;