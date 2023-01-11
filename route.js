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
    getCustomers,
    getCustomer
} from './customer.js'

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

router.get('/employee', async function (req, res) {
    const [results, metadata] = await seq.query("SELECT * from Employee");
    console.log('Sequelize results: ', results);
    const response = {
        result: results,
        message: 'OK'
    }
    try {
        res.json(response)
    } catch (e) {
        console.log(error);
        console.log("ERROR!!");
        res.send(error);
    }
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

// Customer
router.get('/customer', getCustomers);
router.get('/customer/:customerId', getCustomer);

export default router;
