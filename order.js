import { seq } from './app.js';
import config from 'config';

var orderId = 0;
var orderNumber = 20;
const getOrders = async (req, res) => {
    const [results, metadata] = await seq.query("SELECT * from Orders");
    console.log('Orders list: ', results); // array
    let finalItemArray = [];
    // call Menu api
    let itemArray = results[0].itemId.split(':');
    for (let i = 0; i < itemArray.length; i++) {
        const element = itemArray[i];
        const [itemName, metadata2] = await seq.query(`SELECT * from Menu WHERE menuId = ${itemArray[i]}`);
        let itemTitle = itemName[0].title;
        console.log('itemName: ', itemTitle);
        finalItemArray.push(itemTitle);
    }
    results[0].itemId = finalItemArray.toString();
    

    const response = {
        result: results,
        message: 'OK'
    }
    console.log('response: ', response);
    try {
        res.json(response)
        res.status(200)
    } catch (error) {
        console.log(error);
        console.log("ERROR!!");
        res.send(error);
    }
};

const getOrder = async (req, res) => {
    const orderId = req.params.orderId;
    console.log('orderId: ', orderId);
    const [results, metadata] = await seq.query(`SELECT * from Orders WHERE orderId = ${orderId}`);
    console.log('Orders list: ', results);
    const response = {
        result: results,
        message: 'OK'
    }
    try {
        res.json(response)
        res.status(200)
    } catch (error) {
        console.log(error);
        console.log("ERROR!!");
        res.send(error);
    }
};

const postOrder = async (req, res) => {
    console.log('req data: ', req.body);
    try {
        let customerId = req.body.customer_id;
        let amount = req.body.amount;
        let mealType = req.body.mealType;
        let paymentType = req.body.paymentType;
        let itemId = req.body.itemId;

        orderId++;
        orderNumber++;
        const [results, metadata] = await seq.query(`INSERT INTO Orders VALUES (${orderId},'accepted','${customerId}', '${amount}', '${mealType}','${paymentType}','${itemId}', '${orderNumber}')`);
        console.log('Orders list: ', results);
        const response = {
            orderId: orderId.toString(),
            orderNumber: orderNumber,
            message: 'OK'
        }

        res.json(response)
        res.status(200)
    } catch (error) {
        console.log(error);
        console.log("ERROR!!");
        res.send(error);
    }
};

const putOrder = async (req, res) => {
    // {
    //     "orderNumber": "21",
    //     "currentState": "accepted",
    //     "customer_id": "3",
    //     "amount": "170",
    //     "mealType": "內用",
    //     "paymentType": "現金",
    //     "itemId": "4:8:9:18"
    // }
    console.log('req data: ', req.body);
    try {
        let amount = req.body.amount;
        let itemId = req.body.itemId;
        let orderId = req.body.orderId;

        const [results, metadata] = await seq.query(`UPDATE Orders SET amount = '${amount}', itemId = '${itemId}' WHERE orderId = '${orderId}'`);
        console.log('Orders list: ', results);
        const response = {
            orderId: orderId.toString(),
            amount: amount,
            itemId: itemId,
            message: 'OK'
        }

        res.json(response)
        res.status(200)
    } catch (error) {
        console.log(error);
        console.log("ERROR!!");
        res.send(error);
    }
};

const cancelOrder = async (req, res) => {
    // {
    //     "orderNumber": "21",
    //     "currentState": "accepted",
    //     "customer_id": "3",
    //     "amount": "170",
    //     "mealType": "內用",
    //     "paymentType": "現金",
    //     "itemId": "4:8:9:18"
    // }
    console.log('req data: ', req.body);
    try {
        let amount = req.body.amount;
        let itemId = req.body.itemId;
        let orderId = req.body.orderId;
        let currentState = "cancelled";

        const [results, metadata] = await seq.query(`UPDATE Orders SET currentState = '${currentState}' WHERE orderId = '${orderId}'`);
        console.log('Orders list: ', results);
        const response = {
            orderId: orderId.toString(),
            currentState: currentState,
            message: 'OK'
        }

        res.json(response)
        res.status(200)
    } catch (error) {
        console.log(error);
        console.log("ERROR!!");
        res.send(error);
    }
};



export {
    getOrders,
    getOrder,
    postOrder,
    putOrder,
    cancelOrder
}