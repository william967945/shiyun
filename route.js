import { Router } from 'express';
import { seq } from './app.js';

import {
    getOrders,
    getOrder,
    postOrder,
    putOrder,
    cancelOrder
} from './order.js'
import {
    getItems,
    getItem,
    postItem
} from './item.js'
import {
    getEmployees,
    getEmployee,
    postEmployee,
    putEmployee
} from './employee.js'
import {
    getCustomers,
    getCustomer,
    postCustomer,
    putCustomer,
    deleteCustomer
} from './customer.js'
import {
    getInventorys,
    getInventory,
    postInventory,
    putInventory
} from './inventory.js'

var router = Router();


router.get('/healthcheck', function (req, res) {
    let time = new Date();
    let message = 'OK';
    const healthcheck = {
        time: new Date(),
        message: 'OK'
    }
    try {
        res.json(healthcheck)
    } catch (e) {
        res.status(503).send()
    }
    console.log('healthcheck: ', time, message);
})

// Order
router.get('/orders', getOrders);
router.get('/orders/:orderId', getOrder);
router.post('/orders', postOrder);
router.put('/orders/:orderId/update', putOrder);
router.put('/orders/:orderId/cancel', cancelOrder);

// Items
router.get('/items', getItems);
router.get('/item/:itemId', getItem);
router.post('/item', postItem);

// Employee
router.get('/employees', getEmployees);
router.get('/employee/:employeeId', getEmployee);
router.post('/employee', postEmployee);
router.put('/employee/:employeeId/update', putEmployee);
// Customer
router.get('/customers', getCustomers);
router.get('/customer/:customerId', getCustomer);
router.post('/customer', postCustomer);
router.put('/customer/:customerId/update', putCustomer);
router.delete('/customer/:customerId/delete', deleteCustomer);

// Inventory
router.get('/inventorys', getInventorys);
router.get('/inventory/:inventoryId', getInventory);
router.post('/inventory',postInventory);
router.put('/inventory/:inventoryId/update', putInventory);


export default router;
