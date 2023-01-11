import { seq } from './app.js';
import config from 'config';

const getOrders = async (req, res) => {
    const [results, metadata] = await seq.query("SELECT * from Orders");
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
    // {
    //     "orderNumber": "21",
    //     "currentState": "accepted",
    //     "customer_id": "3",
    //     "amount": "170",
    //     "mealType": "內用",
    //     "paymentType": "現金",
    //     "itemId": "4:8:9:18"
    // }

    let values = [];
    values.push();

    const [results, metadata] = await seq.query(`
    INSERT INTO Orders VALUES (
        '1', 
        'accepted', 
        '3',
        '170',
        '內用',
        '現金',
        '4:8:9:18',
        '21'
        )
    `);
    console.log('Orders list: ', results);
    const response = {
        orderId: "1",
        orderNumber: "21"
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


export {
    getOrders,
    getOrder
  }